using System;
using System.Collections.Generic;
using Piranha.Models;

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

		// meta information
		public string Description { get; set; }
		public string Keywords { get; set; }
		public string Robots { get; set; }
		public string MetaTitle { get; set; }

		public IList<Taxonomy> Tags { get; set; }
		
		public string Author { get; set; }
		public string Image { get; set; }
		public DateTime DateTime { get; set; }
	}
}
