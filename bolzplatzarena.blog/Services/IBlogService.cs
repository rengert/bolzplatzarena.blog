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
		/// <summary>
		/// Returns tags for the given archive page
		/// </summary>
		Task<IEnumerable<Taxonomy>> GetTagsAsync(ArchivePage page);

		/// <summary>
		/// Returns the categories for the given archive page
		/// </summary>
		Task<IEnumerable<Taxonomy>> GetCategoriesAsync(ArchivePage page);

		/// <summary>
		/// Finds the post archive for the given data
		/// </summary>
		Task<PostArchive<Post>> Find(ArchivePage page, Guid? tag, Guid? category, string term = null);

		/// <summary>
		/// Returns all approved comments
		/// </summary>
		Task<IEnumerable<Piranha.Models.Comment>> GetCommentsAsync();

		/// <summary>
		/// Creates a comment with the given data and for the given post
		/// </summary>
		Task<Comment> CreateCommentAsync(CommentRequest comment);
	}
}
