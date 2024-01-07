using Microsoft.AspNetCore.Mvc;

namespace Bolzplatzarena.Blog.Controllers
{
	public class HomeController : Controller
	{
		[ResponseCache(Duration = 120)]
		public IActionResult Spa()
		{
			return File("~/index.html", "text/html");
		}
	}
}
