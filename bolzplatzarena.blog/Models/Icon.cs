namespace Bolzplatzarena.Blog.Models
{
	public enum WellknownIcons
	{
		Contact,
		Mail,
		Phone
	}
	
	public class Icon
	{
		public string Name { get; set; }
		
		public string IconCode { get; set; }
	}
}