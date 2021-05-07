using Microsoft.AspNetCore.Mvc;

namespace Bolzplatzarena.Blog.Controllers
{
	public class HomeController : Controller
	{
		public IActionResult Spa()
		{
			return File("~/index.html", "text/html");
		}
	}
}