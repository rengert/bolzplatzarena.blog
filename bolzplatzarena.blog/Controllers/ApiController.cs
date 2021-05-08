using System;
using System.Threading.Tasks;
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

		public Task<DynamicPage> BySlug(string slug)
		{
			return _api.Pages.GetBySlugAsync(slug);
		}

		public Task<Sitemap> Sitemap()
		{
			return _api.Sites.GetSitemapAsync();
		}
	}
}
