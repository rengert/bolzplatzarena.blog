using System;
using System.Collections.Generic;
using Piranha.Extend.Fields;
using Piranha.Models;

namespace Bolzplatzarena.Blog.Models.Angular
{
	public class Teaser
	{
		public string Title { get; init; }
		public string Link { get; init; }
		public HtmlField Body { get; init; }
		public DateTime Date { get; init; }
		public IList<Taxonomy> Tags { get; init; }
		public Taxonomy Category { get; init; }
		public string Image { get; init; }
	}
}
