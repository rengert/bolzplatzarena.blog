using System.Collections.Generic;

namespace Bolzplatzarena.Blog.Models.Angular
{
	public class Page
	{
		public string Title { get; set; }
		public string Link { get; set; }
		public string Type { get; set; }
		public Piranha.Extend.Block[] Blocks { get; set; }
		public IList<Post> Posts { get; set; }
	}
}
