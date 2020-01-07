using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Bolzplatzarena.Blog.Models;
using Piranha.Models;

namespace Bolzplatzarena.Blog.Services
{
	public interface IBlogService
	{
		Task<IEnumerable<Taxonomy>> GetTagsAsync(ArchivePage page);

		Task<IEnumerable<Taxonomy>> GetCategoriesAsync(ArchivePage page);

		Task<PostArchive<Post>> Find(ArchivePage page, Guid? tag, Guid? category, string term = null);
	}
}