using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Battleships.Core.Models
{
	public class OnlineBattle : BaseEntity
	{
		public string Player1 { get; set; }
		public string Player2 { get; set; }
		public string Player1Board { get; set; }
		public string Player2Board { get; set; }
		public int ActivePlayer { get; set; }
		public int GamePhase { get; set; }
		public string Winner { get; set; }

		public OnlineBattle()
		{

		}

		public OnlineBattle(string player1, string player2)
		{
			Player1 = player1;
			Player2 = player2;
			Player1Board = null;
			Player2Board = null;
			GamePhase = 1; //1 - ship placing, 2 - shooting, 3 - gameover
			Winner = null;
		}

	}
}
