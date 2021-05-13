using System;
using System.Collections.Generic;
using Piranha.Extend.Fields;
using Piranha.Models;

namespace Bolzplatzarena.Blog.Models.Angular
{
	public class Teaser
	{
		public string Title { get; set; }
		public string Link { get; set; }
		public HtmlField Body { get; set; }
		public DateTime Date { get; set; }
		public IList<Taxonomy> Tags { get; set; }
		public Taxonomy Category { get; set; }
	}
}
