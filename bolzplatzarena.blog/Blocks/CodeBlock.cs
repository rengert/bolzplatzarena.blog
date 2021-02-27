using System.Net;
using System.Text;
using Piranha.Extend;
using Piranha.Extend.Fields;

namespace Bolzplatzarena.Blog.Blocks
{
	[BlockType(Name = "Code", Category = "Content", Icon = "fas fa-font")]
	public class CodeBlock : Block
	{
		
		public TextField RawCode { get; set; }

		[Field()]
		public StringField Filename { get; set; }

		public StringField Language { get; set; }
		
		public CheckBoxField RunCode { get; set; }

		public string ToHtml()
		{
			if (RawCode?.Value == null)
			{
				return "";
			}

			var sb = new StringBuilder(128);
			string[] splittedLines = RawCode.Value.Split(new char[] { '\n' });

			sb.AppendLine("<div class=\"lines\">");
			for (var i = 1; i <= splittedLines.Length; i++)
			{
				sb.AppendLine($"<span>{i}</span>");
			}
			sb.AppendLine("</div>");
			
			sb.AppendLine("<div class=\"code\">");
			foreach (var t in splittedLines)
			{
				sb.AppendLine($"<pre>{WebUtility.HtmlEncode(t)}</pre>");
			}
			sb.AppendLine("</div>");

			return sb.ToString();
		}
	}
}
