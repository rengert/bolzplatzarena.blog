using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Bolzplatzarena.Blog.Models;
using Bolzplatzarena.Blog.Models.Angular;
using Bolzplatzarena.Blog.Models.Requests;
using Bolzplatzarena.Blog.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OutputCaching;
using Microsoft.CodeAnalysis;
using Piranha;
using Piranha.Models;

namespace Bolzplatzarena.Blog.Controllers
{
	[ApiController]
	[Route("[controller]/[action]/{**slug}")]
	public class ApiController(IApi api, IBlogService service) : Controller
	{
		[HttpGet]
		[OutputCache(PolicyName = "Blog")]
		[ResponseCache(Duration = 120, VaryByQueryKeys = new [] {"**slug" })]
		public async Task<Page> BySlug(string? slug)
		{
			DynamicPage? page;
			if (!string.IsNullOrWhiteSpace(slug))
			{
				page = await api.Pages.GetBySlugAsync(slug);
				if (page == null)
				{
					var post = await api.Posts.GetBySlugAsync<Post>("blog", slug.Replace("blog/", ""));
					return new Page
					{
						Id = post.Id,
						Slug = post.Slug,
						Link = post.Permalink,
						Title = post.Title,
						Type = post.TypeId,
						Blocks = post.Blocks.ToArray(),
						Description = post.MetaDescription,
						Keywords = post.MetaKeywords,
						MetaTitle = post.MetaTitle,
						Tags = post.Tags,
						Robots = "index,follow",
						Author = post.Teaser.Author.Value,
						Image = ((post.Teaser.Image?.Media?.PublicUrl ?? post.PrimaryImage?.Media?.PublicUrl) ?? "").Replace("~", ""),
						DateTime = post.Published.GetValueOrDefault()
					};
				}
			}
			else
			{
				var allPages = await api.Pages.GetAllAsync();
				page =  allPages.FirstOrDefault(item => item.SortOrder == 0);
			}

			if (page == null)
			{
				throw new ArgumentException("Slug seems not to point to a page");
			}

			var result = new Page
			{
				Id = page.Id,
				Slug = page.Slug,
				Link = page.Permalink,
				Title = page.Title,
				Type = page.TypeId,
				Blocks = page.Blocks.ToArray(),
				Description = page.MetaDescription,
				Keywords = page.MetaKeywords,
				MetaTitle = page.MetaTitle,
				Robots = "index,follow"
			};

			if (result.Type != "ArchivePage")
			{
				return result;
			}

			var model = await api.Pages.GetByIdAsync<ArchivePage>(page.Id);
				var archive = await service.Find(model, null, null, "");
				result.Posts = archive.Posts.Select(post => new Teaser
				{
					Title = post.Title,
					Link = post.Permalink,
					Body = post.Teaser.Body,
					Date = post.Created,
					Tags = post.Tags,
					Category = post.Category,
					Image = ((post.Teaser.Image?.Media?.PublicUrl ?? post.PrimaryImage?.Media?.PublicUrl) ?? "").Replace("~", ""),
				}).ToList();

			return result;
		}

		[OutputCache(PolicyName = "Blog")]
		[ResponseCache(Duration = 120)]
		public async Task<IEnumerable<Page>> Sitemap()
		{
			var sitemap = await api.Sites.GetSitemapAsync();
			return sitemap.Select(page => new Page
			{
				Id = page.Id,
				Link = page.Permalink,
				Title = page.Title,
				SortOrder = page.SortOrder,
			});
		}

		[OutputCache(PolicyName = "Blog")]
		[ResponseCache(Duration = 120)]
		public Task<IEnumerable<Piranha.Models.Comment>> Comments()
		{
			return service.GetCommentsAsync();
		}

		[HttpPost]
		public Task<Models.Comment> Comment(CommentRequest comment)
		{
			return service.CreateCommentAsync(comment);
		}
	}
}
