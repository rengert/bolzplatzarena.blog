using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Razor.TagHelpers;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.FileProviders;

namespace Bolzplatzarena.Blog.TagHelpers
{
	public abstract class InlineTagHelper : TagHelper
	{
		private const string CacheKeyPrefix = "InlineTagHelper-";

		private readonly IWebHostEnvironment _hostingEnvironment;
		private readonly IMemoryCache _cache;

		protected InlineTagHelper(IWebHostEnvironment hostingEnvironment, IMemoryCache cache)
		{
			_hostingEnvironment = hostingEnvironment;
			_cache = cache;
		}

		private async Task<T> GetContentAsync<T>(ICacheEntry entry, string path, Func<IFileInfo, Task<T>> getContent)
		{
			var fileProvider = _hostingEnvironment.WebRootFileProvider;
			var changeToken = fileProvider.Watch(path);

			entry.SetPriority(CacheItemPriority.NeverRemove);
			entry.AddExpirationToken(changeToken);

			var file = fileProvider.GetFileInfo(path);
			if (file == null || !file.Exists)
				return default(T);

			return await getContent(file);
		}

		protected Task<string> GetFileContentAsync(string path)
		{
			return _cache.GetOrCreateAsync(CacheKeyPrefix + path, entry =>
			{
				return GetContentAsync(entry, path, ReadFileContentAsStringAsync);
			});
		}

		protected Task<string> GetFileContentBase64Async(string path)
		{
			return _cache.GetOrCreateAsync(CacheKeyPrefix + path, entry =>
			{
				return GetContentAsync(entry, path, ReadFileContentAsBase64Async);
			});
		}

		private static async Task<string> ReadFileContentAsStringAsync(IFileInfo file)
		{
			using (var stream = file.CreateReadStream())
			using (var textReader = new StreamReader(stream))
			{
				return await textReader.ReadToEndAsync();
			}
		}

		private static async Task<string> ReadFileContentAsBase64Async(IFileInfo file)
		{
			using (var stream = file.CreateReadStream())
			using (var writer = new MemoryStream())
			{
				await stream.CopyToAsync(writer);
				writer.Seek(0, SeekOrigin.Begin);
				return Convert.ToBase64String(writer.ToArray());
			}
		}
	}
}
