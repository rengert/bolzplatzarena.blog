using System;
using System.Linq;
using System.Threading.Tasks;
using Bolzplatzarena.Blog.Models;
using Bolzplatzarena.Blog.Models.Angular;
using Bolzplatzarena.Blog.Services;
using Microsoft.AspNetCore.Mvc;
using Piranha;
using Piranha.Models;

namespace Bolzplatzarena.Blog.Controllers
{
	[ApiController]
	[Route("[controller]/[action]/{**slug}")]
	public class ApiController : Controller
	{
		private readonly IApi _api;
		private readonly IBlogService _service;

		public ApiController(IApi api, IBlogService service)
		{
			_api = api;
			_service = service;
		}

		public async Task<Page> BySlug(string slug)
		{
			DynamicPage page;
			if (!string.IsNullOrWhiteSpace(slug))
			{
				page = await _api.Pages.GetBySlugAsync(slug);
			}
			else
			{
				var allPages = await _api.Pages.GetAllAsync();
				page =  allPages.FirstOrDefault(item => item.SortOrder == 0);
			}

			if (page == null)
			{
				throw new ArgumentException("Slug seems not to point to a page");
			}

			var result = new Page
			{
				Title = page.Title,
				Type = page.TypeId,
				Blocks = page.Blocks.ToArray(),
			};

			if (result.Type == "ArchivePage")
			{
				var model = await _api.Pages.GetByIdAsync<ArchivePage>(page.Id);
				var archive = await _service.Find(model, null, null, "");
				result.Posts = archive.Posts.Select(post => new Post
				{
					Teaser = post.Teaser
				}).ToList();
			}

			return result;
		}

		public Task<Sitemap> Sitemap()
		{
			return _api.Sites.GetSitemapAsync();
		}
	}
}
