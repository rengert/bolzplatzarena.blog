using Piranha.AttributeBuilder;
using Piranha.Models;

namespace Bolzplatzarena.Blog.Models
{
	[PageType(Title = "Archive page", IsArchive = true, UseBlocks = true)]
	[PageTypeRoute(Title = "Cms archive", Route = "/archive")]
	public class ArchivePage  : Page<ArchivePage>
	{
		public PostArchive<DynamicPost> Archive { get; set; }
	}
}