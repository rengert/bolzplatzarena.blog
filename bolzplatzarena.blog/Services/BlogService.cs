using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Bolzplatzarena.Blog.Models;
using Microsoft.EntityFrameworkCore;
using Piranha;
using Piranha.Models;

namespace Bolzplatzarena.Blog.Services
{
	public class BlogService: IBlogService
	{
		private readonly IApi _api;
		private readonly IDb _db;

		public BlogService(IApi api, IDb db)
		{
			_api = api;
			_db = db;
		}
		
		public async Task<IEnumerable<Taxonomy>> GetTagsAsync(ArchivePage page)
		{
			return await _api.Posts.GetAllTagsAsync(page.Id);
		}

		public async Task<IEnumerable<Taxonomy>> GetCategoriesAsync(ArchivePage page)
		{
			return await _api.Posts.GetAllCategoriesAsync(page.Id);
		}

		public async Task<PostArchive<Post>> Find(ArchivePage page, Guid? tag, Guid? category, string term = null)
		{
			if (string.IsNullOrEmpty(term))
			{
				return await _api.Archives.GetByIdAsync<Post>(page.Id, null, category, tag);
			}
			var model = new PostArchive<Post>();
			// Set related info
			if (category.HasValue)
			{
				model.Category = await _api.Posts.GetCategoryByIdAsync(category.Value).ConfigureAwait(false);
			}
			if (tag.HasValue)
			{
				model.Tag = await _api.Posts.GetTagByIdAsync(tag.Value).ConfigureAwait(false);
			}

			var posts = await GetQuery(page.Id, category, tag, term).Select(post => post.Id).ToListAsync();
			foreach (var postId in posts)
			{
				var post = await _api.Posts.GetByIdAsync<Post>(postId).ConfigureAwait(false);

				if (post != null)
				{
					model.Posts.Add(post);
				}
			}
			return model;
		}
		
		private IQueryable<Piranha.Data.Post> GetQuery(Guid archiveId, Guid? categoryId = null, Guid? tagId = null, string term = null)
		{
			// Build the query.
			var now = DateTime.Now;
			var query = _db.Posts
				.Where(p => p.BlogId == archiveId && p.Published <= now);

			if (categoryId.HasValue)
			{
				query = query.Where(p => p.CategoryId == categoryId.Value);
			}
			if (tagId.HasValue)
			{
				query = query.Where(p => p.Tags.Any(t => t.TagId == tagId.Value));
			}

			if (!string.IsNullOrEmpty(term))
			{
				query = query.Where(p => p.Title.ToLower().Contains(term.ToLower()));
			}

			return query;
		}
	}
}