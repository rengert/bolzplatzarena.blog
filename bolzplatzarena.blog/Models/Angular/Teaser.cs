using Piranha.Extend.Fields;

namespace Bolzplatzarena.Blog.Models.Angular
{
	public class Teaser
	{
		public string Title { get; set; }
		public string Link { get; set; }
		public HtmlField Body { get; set; }
	}
}
