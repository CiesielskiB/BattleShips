using Battleships.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Battleships.Core.ViewModels
{
	public class UserPanelLeaderboardModel
	{
		public List<string> UserName { get; set; }
		public List<string> Image { get; set; }
		public List<LeaderBoard> LeaderBoards { get; set; }

		public UserPanelLeaderboardModel()
		{
			this.UserName = new List<string>();
			this.Image = new List<string>();
		}
	}
}
