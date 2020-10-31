﻿using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Razor.TagHelpers;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Primitives;

namespace Bolzplatzarena.Blog.TagHelpers
{
	public class InlineStyleTagHelper : TagHelper
	{
		[HtmlAttributeName("href")]
		public string Href { get; set; }

		private IWebHostEnvironment HostingEnvironment { get; }
		private IMemoryCache Cache { get; }

		public InlineStyleTagHelper(IWebHostEnvironment hostingEnvironment, IMemoryCache cache)
		{
			HostingEnvironment = hostingEnvironment;
			Cache = cache;
		}

		public override async Task ProcessAsync(TagHelperContext context, TagHelperOutput output)
		{
			var path = Href;
			var fileContent = await Cache.GetOrCreateAsync("InlineStyleTagHelper-" + path, async entry => await Get(entry, path));

			if (fileContent == null)
			{
				output.SuppressOutput();
				return;
			}

			output.TagName = "style";
			output.Attributes.RemoveAll("href");
			output.Content.AppendHtml(Minify(fileContent));
		}

		private async Task<string> Get(ICacheEntry entry, string path)
		{
			IFileProvider fileProvider = HostingEnvironment.WebRootFileProvider;
			IChangeToken changeToken = fileProvider.Watch(path);

			entry.SetPriority(CacheItemPriority.NeverRemove);
			entry.AddExpirationToken(changeToken);

			IFileInfo file = fileProvider.GetFileInfo(path);
			if (!file.Exists)
			{
				return null;
			}


			return await ReadFileContent(file);
		}

		private static async Task<string> ReadFileContent(IFileInfo file)
		{
			using (var stream = file.CreateReadStream())
			using (var textReader = new StreamReader(stream))
			{
				return await textReader.ReadToEndAsync();
			}
		}

		private string Minify(string content)
		{
			return content
				.Replace(": ", ":")
				.Replace("\n", "")
				.Replace("  ", "")
				.Replace("  ", "")
				.Replace("  ", "")
				.Replace("{ ", "{")
				.Replace("} ", "}")
				.Replace(" {", "{")
				.Replace(" }", "}")
				.Replace(";  ", ";");;
		}
	}
}
