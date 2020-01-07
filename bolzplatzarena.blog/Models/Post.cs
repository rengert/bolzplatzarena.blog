using Piranha.AttributeBuilder;
using Piranha.Models;

namespace Bolzplatzarena.Blog.Models
{
	[PostType(Title = "Post", Id = "Post")]
	[PostTypeRoute(Title = "Post", Route = "/detail")]
	public class Post : Post<Post>
	{
	}
}