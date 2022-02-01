using System;
using System.Threading.Tasks;
using Bolzplatzarena.Blog.Models;
using Bolzplatzarena.Blog.Services;
using Microsoft.AspNetCore.Mvc;
using Piranha;

namespace Bolzplatzarena.Blog.Controllers
{
	public class CmsController : Controller
	{
		private readonly IApi _api;
		private readonly IBlogService _service;

		public CmsController(IApi api, IBlogService service)
		{
			_api = api;
			_service = service;
		}

		public async Task<IActionResult> Page(Guid id)
		{
			var model = await _api.Pages.GetByIdAsync<StandardPage>(id);
			ViewBag.CurrentPage = model.Id;

			return View(model);
		}

		public async Task<IActionResult> Archive(Guid id, Guid? tag, Guid? category, string term = null)
		{
			var model = await _api.Pages.GetByIdAsync<ArchivePage>(id);
			if (model == null)
			{
				return NotFound();
			}

			model.SearchTerm = term;
			model.Archive = await _service.Find(model, tag, category, term);
			model.Categories = await _service.GetCategoriesAsync(model);
			model.Tags = await _service.GetTagsAsync(model);
			ViewBag.CurrentPage = model.Id;
			return View(model);
		}

		public async Task<IActionResult> Detail(Guid id)
		{
			var model = await _api.Posts.GetByIdAsync<Post>(id);
			if (model == null)
			{
				return NotFound();
			}

			ViewBag.CurrentPage = model.Id;
			return View(model);
		}
	}
}
