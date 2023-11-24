using Piranha.Extend;
using Piranha.Extend.Fields;

namespace Bolzplatzarena.Blog.Blocks
{
	[BlockType(Name = "Performance", Category = "Content", Icon = "fas fa-tachometer-alt")]
	public class PerformanceBlock : Block
	{
		public required StringField Body { get; set; }
	}
}
