using System.IO.Compression;
using Bolzplatzarena.Blog.Blocks;
using Bolzplatzarena.Blog.Helper;
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
using Piranha.AspNetCore.Identity.SQLite;
using Piranha.AttributeBuilder;
using Piranha.Data.EF.SQLite;

namespace Bolzplatzarena.Blog
{
	public class Startup
	{
		public IConfiguration Configuration { get; set; }

		public Startup(IConfiguration configuration)
		{
			Configuration = configuration;
		}

		// This method gets called by the runtime. Use this method to add services to the container.
		// For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
		public void ConfigureServices(IServiceCollection services)
		{
			services.AddResponseCompression(options =>
			{
				options.EnableForHttps = true;
			});
			services.Configure<GzipCompressionProviderOptions>(options => {
				options.Level = CompressionLevel.Optimal;
			});
			// Service setup
			services.AddPiranha(options =>
			{
				options.UseFileStorage();
				options.UseImageSharp();
				options.UseManager();
				options.UseTinyMCE();
				options.UseMemoryCache();
				options.UseEF<SQLiteDb>(db =>
					db.UseSqlite(Configuration.GetConnectionString("piranha")));
				options.UseIdentityWithSeed<IdentitySQLiteDb>(db =>
					db.UseSqlite(Configuration.GetConnectionString("piranha")));
			});
			services.AddScoped<IBlogService, BlogService>();
			services.AddSingleton<IViewHelper, ViewHelper>();
		}

		// This method gets called by the runtime. Use this met hod to configure the HTTP request pipeline.
		public void Configure(IApplicationBuilder app, IWebHostEnvironment env, IApi api)
		{
			if (env.IsDevelopment())
			{
				app.UseDeveloperExceptionPage();
			}

			// Initialize Piranha
			App.Init(api);

			// Configure cache level
			App.CacheLevel = Piranha.Cache.CacheLevel.Basic;

			// Build content types
			new ContentTypeBuilder(api)
				.AddAssembly(typeof(Startup).Assembly)
				.Build()
				.DeleteOrphans();

			App.Blocks.Register<CodeBlock>();
			App.Modules.Get<Piranha.Manager.Module>()
				.Scripts.Add("~/js/manager.js");

			// Configure Tiny MCE
			// EditorConfig.FromFile("editorconfig.json");
			app.UseResponseCompression();

			var cachePeriod = "31536000";
			app.UseStaticFiles(new StaticFileOptions()
			{
				OnPrepareResponse = ctx =>
				{
					ctx.Context.Response.Headers.Append("Cache-Control", $"public, max-age={cachePeriod}");
				}
			});
			app.UseStatusCodePagesWithReExecute("/not-found");
			app.UseStaticFiles();
			// Middleware setup
			app.UsePiranha(options =>
			{
				options.UseManager();
				options.UseTinyMCE();
				options.UseIdentity();
			});
		}
	}
}
                   