using Piranha.Extend;
using Piranha.Extend.Fields;

namespace Bolzplatzarena.Blog.Models.Regions
{
	public class Teaser
	{
		[Field]
		public StringField Author { get; set; }

		[Field]
		public ImageField? Image { get; set; }

		[Field]
		public HtmlField Body { get; set; }
	}
}
