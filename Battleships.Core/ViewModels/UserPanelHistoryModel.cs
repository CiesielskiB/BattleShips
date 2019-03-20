using Battleships.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Battleships.Core.ViewModels
{
	public class UserPanelHistoryModel
	{
		public List<GameHistory> Matches;
		public List<string> PlayerOne;
		public List<string> PlayerTwo;
		public List<string> ImagePlayerOne;
		public List<string> ImagePlayerTwo;

		public UserPanelHistoryModel()
		{
			this.PlayerOne = new List<string>();
			this.PlayerTwo = new List<string>();
			this.ImagePlayerOne = new List<string>();
			this.ImagePlayerTwo = new List<string>();
		}
	}
}
