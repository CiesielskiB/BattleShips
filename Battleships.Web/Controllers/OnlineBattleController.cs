using Battleships.Core.Contracts;
using Battleships.Core.Models;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Battleships.Web.Controllers
{
    public class OnlineBattleController : Controller
    {
		IRepository<LeaderBoard> LeaderBoardContext;
		IRepository<GameHistory> GameHistoryContext;
		IRepository<OnlineBattle> BattlesContext;

		public OnlineBattleController(IRepository<LeaderBoard> leaderBoardContext, IRepository<GameHistory> gameHistoryContext, IRepository<OnlineBattle> battlesContext)
		{
			LeaderBoardContext = leaderBoardContext;
			GameHistoryContext = gameHistoryContext;
			BattlesContext = battlesContext;
		}

		public ActionResult Index(string battleId)
        {
            return View();
        }

		public ActionResult Create(string player1, string player2)
		{
			string firstPlayerName, secondPlayerName;

			//choose player that goes first
			if(player1.CompareTo(player2) > 0)
			{
				firstPlayerName = player1;
				secondPlayerName = player2;
			}
			else
			{
				firstPlayerName = player2;
				secondPlayerName = player1;
			}

			var newBattle = BattlesContext.Collection().Where(x => x.Player1.Equals(firstPlayerName) && x.Player2.Equals(secondPlayerName)).FirstOrDefault();

			if (newBattle == null)
			{
				newBattle = new OnlineBattle(firstPlayerName, secondPlayerName);
				GetContext().Clients.Group(player2).AcceptChallenge(newBattle.Id);
				BattlesContext.Insert(newBattle);
				BattlesContext.Commit();
				return RedirectToAction("Index", new { battleId = newBattle.Id });
			}
			else
			{
				GetContext().Clients.Group(player2).DeclineChallenge();
				return Redirect("/Game/Lobby");
			}

			

			
		}


		private IHubContext GetContext()
		{
			return GlobalHost.ConnectionManager.GetHubContext<LobbyHub>();
		}
    }
}