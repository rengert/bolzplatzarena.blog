using System;
using System.Globalization;
using System.IO.Compression;
using Bolzplatzarena.Blog.Blocks;
using Bolzplatzarena.Blog.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.ResponseCompression;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Piranha;
using Piranha.AspNetCore.Http;
using Piranha.AspNetCore.Identity.SQLite;
using Piranha.AttributeBuilder;
using Piranha.Data.EF.SQLite;

namespace Bolzplatzarena.Blog
{
	public class Startup(IConfiguration configuration)
	{
		private IConfiguration Configuration { get; } = configuration;

		// This method gets called by the runtime. Use this method to add services to the container.
		// For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
		public void ConfigureServices(IServiceCollection services)
		{
			services.AddCors(options =>
			{
				options.AddPolicy("Debug",
					builder =>
					{
						builder.AllowAnyOrigin()
							.AllowAnyHeader()
							.AllowAnyMethod();
					});
			});

			services.AddResponseCaching();
			services.AddOutputCache(options =>
			{
				options.AddBasePolicy(builder => builder.Tag("tag-all"));
				options.AddPolicy("Blog", builder => builder.Expire(TimeSpan.FromMinutes(2)).SetVaryByRouteValue("slug"));
				options.AddPolicy("Images", builder => builder.Expire(TimeSpan.FromMinutes(60 * 24 * 7)).SetVaryByQuery("image", "width", "height"));
				options.AddPolicy("NoCache", builder => builder.NoCache());
				options.AddPolicy("NoLock", builder => builder.SetLocking(false));
			});
			services.AddResponseCompression(options => { options.EnableForHttps = true; });
			services.Configure<GzipCompressionProviderOptions>(options =>
			{
				options.Level = CompressionLevel.Optimal;
			});
			services.AddTransient<IStartupFilter, StartupFilter>();

			// Service setup
			services.AddPiranha(options =>
			{
				options.UseFileStorage();
				options.UseImageSharp();
				options.UseCms();
				options.UseManager();
				options.UseTinyMCE();
				options.UseMemoryCache();
				options.UseEF<SQLiteDb>(db =>
					db.UseSqlite(Configuration.GetConnectionString("piranha")));
				options.UseIdentityWithSeed<IdentitySQLiteDb>(
						db => db.UseSqlite(Configuration.GetConnectionString("piranha")), 
						cookieOptions: cookie =>
						{
							cookie.Cookie.HttpOnly = true;
							cookie.ExpireTimeSpan = TimeSpan.FromMinutes(30);
							cookie.LoginPath = "/manager/login";
							cookie.AccessDeniedPath = "/manager/login";
							cookie.SlidingExpiration = true;
							cookie.SessionStore = new MemoryCacheTicketStore();
						}
				);
			});
			services.AddScoped<IBlogService, BlogService>();
		}

		// This method gets called by the runtime. Use this met hod to configure the HTTP request pipeline.
		public void Configure(IApplicationBuilder app, IWebHostEnvironment env, IApi api)
		{
			if (env.IsDevelopment())
			{
				app.UseCors("Debug");
				app.UseDeveloperExceptionPage();
			}
			// Initialize Piranha
			App.Init(api);

			// Configure cache level
			App.CacheLevel = Piranha.Cache.CacheLevel.Basic;
			app.UseOutputCache();
			app.UseResponseCaching();
			app.UseResponseCompression();

			// Build content types
			new ContentTypeBuilder(api)
				.AddAssembly(typeof(Startup).Assembly)
				.Build()
				.DeleteOrphans();

			App.Blocks.Register<CodeBlock>();
			App.Blocks.Register<PerformanceBlock>();
			App.Blocks.Register<SoundBlock>();
			App.Blocks.Register<SearchBlock>();

			App.Modules.Get<Piranha.Manager.Module>()
				.Scripts.Add("~/js/manager.js");

			app.UseStatusCodePagesWithReExecute("/not-found");
			app.UsePiranha(options =>
			{
				options.UseManager();
				options.UseTinyMCE();
				options.UseIdentity();
			});
			app.UseSpa(spa =>
			{
				spa.Options.SourcePath = "angular/dist/angular/browser";
				spa.Options.DefaultPageStaticFileOptions = new StaticFileOptions()
				{
					OnPrepareResponse = ctx =>
					{
						ctx.Context.Response.Headers.Append("Cache-Control", "public,max-age=3600");
						ctx.Context.Response.Headers.Append("Expires", DateTime.UtcNow.AddHours(1).ToString("R", CultureInfo.InvariantCulture));
					}
				};
			});
			app.UseMiddleware<SitemapMiddleware>();
			app.UseRouting();
			app.UseEndpoints(endpoints =>
			{
				endpoints.MapControllerRoute(
					name: "default",
					pattern: "{controller=Home}/{action=Spa}/{id?}");
				endpoints.MapPiranhaManager();
			});
		}
	}
}
