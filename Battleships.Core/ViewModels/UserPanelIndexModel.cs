using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Battleships.Core.ViewModels
{
	public class UserPanelIndexModel
	{
		public string Image { get; set; }
		public int BoardSize { get; set; }
		public int Frigate { get; set; }
		public int Destroyer { get; set; }
		public int Cruiser { get; set; }
		public int Battleship { get; set; }
		public int Carrier { get; set; }
		public int Wins { get; set; }
		public int Loses { get; set; }
		public double WinRatio { get; set; }
	}
}
