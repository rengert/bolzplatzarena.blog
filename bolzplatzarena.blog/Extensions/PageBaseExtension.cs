namespace Piranha.Models
{
	public static class PageBaseExtension
	{
		public static bool IsStartPage(this PageBase page)
		{
				return !page.ParentId.HasValue && page.SortOrder == 0;
		}
	}
}