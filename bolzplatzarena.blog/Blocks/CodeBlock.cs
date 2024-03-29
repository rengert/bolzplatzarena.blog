using System.Net;
using System.Text;
using Piranha.Extend;
using Piranha.Extend.Fields;

namespace Bolzplatzarena.Blog.Blocks
{
	[BlockType(Name = "Code", Category = "Content", Icon = "fas fa-font")]
	public class CodeBlock : Block
	{
		public TextField? RawCode { get; set; }

		[Field()]
		public required StringField Filename { get; set; }

		public required StringField Language { get; set; }

		public required CheckBoxField RunCode { get; set; }

		public string ToHtml()
		{
			if (RawCode?.Value == null)
			{
				return "";
			}

			var sb = new StringBuilder(128);
			var splitLines = RawCode.Value.Split(new[] { '\n' });

			sb.AppendLine("<div class=\"lines\">");
			for (var i = 1; i <= splitLines.Length; i++)
			{
				sb.AppendLine($"<span>{i}</span>");
			}
			sb.AppendLine("</div>");

			sb.AppendLine("<div class=\"code\">");
			foreach (var t in splitLines)
			{
				sb.AppendLine($"<pre>{WebUtility.HtmlEncode(t)}</pre>");
			}
			sb.AppendLine("</div>");

			return sb.ToString();
		}
	}
}
