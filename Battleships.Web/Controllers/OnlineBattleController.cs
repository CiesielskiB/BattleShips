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

		public ActionResult Index()
        {
            return View();
        }

		public ActionResult Create(string player1, string player2)
		{
			string currentPlayerName, enemyPlayerName;


			return RedirectToAction("Index");
		}


		private IHubContext getContext()
		{
			return GlobalHost.ConnectionManager.GetHubContext<LobbyHub>();
		}
    }
}