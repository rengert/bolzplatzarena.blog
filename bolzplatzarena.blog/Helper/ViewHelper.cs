using System;
using Bolzplatzarena.Blog.Models;
using Microsoft.Extensions.Configuration;
using Piranha.Models;

namespace Bolzplatzarena.Blog.Helper
{
	public class ViewHelper: IViewHelper
	{
		private readonly IConfiguration _configuration;
		
		public ViewHelper(IConfiguration configuration)
		{
			_configuration = configuration;

			if (string.IsNullOrWhiteSpace(_configuration["base:url"]) || !_configuration["base:url"].EndsWith("/"))
			{
				throw new ArgumentException("base:url is not in expected format. (should be not empty and should end with'/'");
			}
		}
		
		public string ToAbsoluteUrl(string relativeUrl)
		{
			return _configuration["base:url"] + relativeUrl.TrimStart('/');
		}

		public string ToAbsoluteUrl(RoutedContentBase page)
		{
			return ToAbsoluteUrl(page is PageBase pageBase && pageBase.IsStartPage() ? "" : page.Permalink);
		}

		public string Content(string key)
		{
			return _configuration[$"content:{key}"] ?? key;
		}

		public Icon Icon(WellknownIcons key)
		{
			return key switch
			{
				WellknownIcons.Phone => new Icon { Name = "Phone", IconCode = "&#9743;" },
				WellknownIcons.Contact => new Icon { Name = "Contact", IconCode = "&#9998;" },
				_ => new Icon { Name = "Email", IconCode = "&#128231;" }
			};
		}
	}
}