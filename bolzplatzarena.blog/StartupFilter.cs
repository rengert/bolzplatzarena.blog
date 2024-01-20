using System;
using System.Globalization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Features;

namespace Bolzplatzarena.Blog;

internal class StartupFilter : IStartupFilter
{
	public Action<IApplicationBuilder> Configure(Action<IApplicationBuilder> next)
	{
		return builder =>
		{
			builder
				.UseResponseCompression()
				.UseStaticFiles(new StaticFileOptions
				{
					HttpsCompression = HttpsCompressionMode.Compress,
					OnPrepareResponse = ctx =>
					{
						ctx.Context.Response.Headers.Append("Cache-Control", "public,max-age=2592000");
						ctx.Context.Response.Headers.Append("Expires", DateTime.UtcNow.AddDays(30).ToString("R", CultureInfo.InvariantCulture));
					}
				});
				next(builder);
		};
	}
}
