using System;
using System.Threading.Tasks;
using Bolzplatzarena.Blog.Models;
using Microsoft.AspNetCore.Mvc;
using Piranha;

namespace Bolzplatzarena.Blog.Controllers
{
	public class CmsController : Controller
	{
		private readonly IApi _api;

		/// <summary>
		/// Default constructor.
		/// </summary>
		/// <param name="api">The current api</param>
		public CmsController(IApi api) 
		{
			_api = api;
		}
		
		/// <summary>
		/// Gets the page with the given id.
		/// </summary>
		/// <param name="id">The unique page id</param>
		[Route("page")]
		public async Task<IActionResult> Page(Guid id) 
		{
			var model = await _api.Pages.GetByIdAsync<StandardPage>(id);
			ViewBag.CurrentPage = model.Id;

			return View(model);
		}

		[Route("archive")]
		public async Task<IActionResult> archive(Guid id) 
		{
			var model = await _api.Pages.GetByIdAsync<ArchivePage>(id);

			if(model != null)
			{
				model.Archive = await _api.Archives.GetByIdAsync<Post>(id);
				ViewBag.CurrentPage = model.Id;
				return View(model);
			}

			return NotFound();
		}
	}
}