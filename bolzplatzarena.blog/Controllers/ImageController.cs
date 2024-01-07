using System;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OutputCaching;

namespace Bolzplatzarena.Blog.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ImageController: Controller
{
	private static readonly HttpClient client = new();

	// Method do load a image from server
	[HttpGet("{**image}")]
	[OutputCache(PolicyName = "Images")]
	[ResponseCache(Duration = 1800, VaryByQueryKeys = new [] { "width", "height" } )]
	public async Task<IActionResult> GetImage(string image, [FromQuery] int width = 0, [FromQuery] int height = 0)
	{
		
		var clearedImage = image.Replace("uploads/", "/");
		var url = "https://ik.imagekit.io/bolzplatzarena/blog/" + clearedImage + "?tr=w-" + width + ",h-" + height;
		try
		{
			var imageBytes = await client.GetByteArrayAsync(url);
			return File(
				imageBytes,
				image.EndsWith(".png", StringComparison.InvariantCultureIgnoreCase)
					? "image/png"
					: "image/jpeg"
			);
		}
		catch (HttpRequestException)
		{
			return NotFound();
		}
	}
}
