using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Piranha.Models;
using Bolzplatzarena.Blog.Models;
using Bolzplatzarena.Blog.Models.Requests;
using Comment = Bolzplatzarena.Blog.Models.Comment;

namespace Bolzplatzarena.Blog.Services
{
	public interface IBlogService
	{
		Task<IEnumerable<Taxonomy>> GetTagsAsync(ArchivePage page);

		Task<IEnumerable<Taxonomy>> GetCategoriesAsync(ArchivePage page);

		Task<PostArchive<Post>> Find(ArchivePage page, Guid? tag, Guid? category, string term = null);

		Task<IEnumerable<Piranha.Models.Comment>> GetCommentsAsync();

		Task<Comment> CreateCommentAsync(CommentRequest comment);
	}
}
