using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Battleships.Core.ViewModels
{
	public class UserDetailsModel
	{
		public string UserId { get; set; }
		public string UserName { get; set; }
		public string Image { get; set; }
		public int Wins { get; set; }
		public int Loses { get; set; }
		public Decimal WinRatio { get; set; }
	}
}
