using System;
using System.Collections.Generic;

namespace Bolzplatzarena.Blog.Models.Angular
{
	public class Page
	{
		public Guid Id { get; set; }
		public string Title { get; set; }
		public string Link { get; set; }
		public string Slug { get; set; }
		public string Type { get; set; }
		public Piranha.Extend.Block[] Blocks { get; set; }
		public IList<Teaser> Posts { get; set; }

		public int SortOrder { get; set; }
	}
}
