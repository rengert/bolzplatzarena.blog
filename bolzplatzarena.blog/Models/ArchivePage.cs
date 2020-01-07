using System.Collections.Generic;
using Piranha.AttributeBuilder;
using Piranha.Models;

namespace Bolzplatzarena.Blog.Models
{
	[PageType(Title = "Archive page", IsArchive = true, UseBlocks = true)]
	[PageTypeRoute(Title = "Cms archive", Route = "/archive")]
	public class ArchivePage  : Page<ArchivePage>
	{
		public PostArchive<Post> Archive { get; set; }
		
		public IEnumerable<Taxonomy> Tags { get; set; }
		
		public IEnumerable<Taxonomy> Categories { get; set; }

		public Taxonomy Category => Archive.Category;

		public Taxonomy Tag => Archive.Tag;

		public string SearchTerm { get; set; }
	}
}