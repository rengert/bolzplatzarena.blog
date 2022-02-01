using System.IO.Compression;
using Bolzplatzarena.Blog.Blocks;
using Bolzplatzarena.Blog.Helper;
using Bolzplatzarena.Blog.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.ResponseCompression;
using Microsoft.AspNetCore.SpaServices.AngularCli;
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
		private IConfiguration Configuration { get; }

		public Startup(IConfiguration configuration)
		{
			Configuration = configuration;
		}

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
			services.AddResponseCompression(options => { options.EnableForHttps = true; });
			services.Configure<GzipCompressionProviderOptions>(options =>
			{
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
				app.UseCors("Debug");
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
			App.Blocks.Register<PerformanceBlock>();
			App.Blocks.Register<SoundBlock>();

			App.Modules.Get<Piranha.Manager.Module>()
				.Scripts.Add("~/js/manager.js");

			app.UseResponseCompression();

			const string cachePeriod = "31536000";
			app.UseStaticFiles(new StaticFileOptions()
			{
				OnPrepareResponse = ctx =>
				{
					ctx.Context.Response.Headers.Append("Cache-Control", $"public, max-age={cachePeriod}");
				}
			});
			app.UseStatusCodePagesWithReExecute("/not-found");
			app.UseStaticFiles();
			app.UsePiranha(options =>
			{
				options.UseManager();
				options.UseTinyMCE();
				options.UseIdentity();
			});

			app.UseSpa(spa =>
			{
				spa.Options.SourcePath = "angular";
				if (env.IsDevelopment())
				{
					spa.UseAngularCliServer(npmScript: "start");
				}
			});
			app.UseRouting();
			app.UseEndpoints(endpoints =>
			{
				endpoints.MapControllerRoute(
					name: "default",
					pattern: "{controller=Home}/{action=Spa}/{id?}");
			});
		}
	}
}
