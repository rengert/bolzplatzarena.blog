using Bolzplatzarena.Blog.Models;
using Piranha.Models;

namespace Bolzplatzarena.Blog.Helper
{
	public interface IViewHelper
	{
		string ToAbsoluteUrl(string relativeUrl);

		string ToAbsoluteUrl(RoutedContentBase page);

		string Content(string key);

		Icon Icon(WellknownIcons key);
	}
}