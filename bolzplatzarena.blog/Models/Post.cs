using Bolzplatzarena.Blog.Models.Regions;
using Piranha.AttributeBuilder;
using Piranha.Extend;
using Piranha.Models;

namespace Bolzplatzarena.Blog.Models
{
	[PostType(Title = "Post", Id = "Post")]
	[PostTypeRoute(Title = "Post", Route = "/detail")]
	public class Post : Post<Post>
	{
		[Region]
		public Teaser Teaser { get; set; }
	}
}