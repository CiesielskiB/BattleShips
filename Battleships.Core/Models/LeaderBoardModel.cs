using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Battleships.Core.Models
{
	public class LeaderBoardModel : BaseEntity
	{
		public string UserId { get; private set; }
		public int Wins { get; set; }
		public int Loses { get; set; }
		public int MatchesPlayed { get; set; }

		public LeaderBoardModel(string userId)
		{
			this.UserId = userId;
			this.Wins = 0;
			this.Loses = 0;
			this.MatchesPlayed = 0;
		}
	}
}
