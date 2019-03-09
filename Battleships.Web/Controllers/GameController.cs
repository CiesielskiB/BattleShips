using Battleships.Core.Contracts;
using Battleships.Core.Models;
using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Battleships.Web.Controllers
{
	//[Authorize]
    public class GameController : Controller
    {
		//TODO get players options from database optionsContext
		IRepository<PersonalOptions> OptionsContext;
		IRepository<LeaderBoard> LeaderBoardContext;
		IRepository<GameHistory> GameHistoryContext;

		public GameController(IRepository<PersonalOptions> OptionsContext, IRepository<LeaderBoard> LeaderBoardContext, IRepository<GameHistory> GameHistoryContext)
		{
			this.OptionsContext = OptionsContext;
			this.LeaderBoardContext = LeaderBoardContext;
			this.GameHistoryContext = GameHistoryContext;
		}

		// GET: Game
		public ActionResult Index()
        {
            return View();
        }

		public ActionResult GameVsBot(bool bot)
		{
			GameOptions gameOptions = new GameOptions();
		
			gameOptions.Bot = bot;
			gameOptions.PlayerOne = "player1"; //change it later to get it from user
			if (bot) gameOptions.PlayerTwo = "Beep Boop";
			gameOptions.PlayersOptions = new PersonalOptions("mock");


			return View(gameOptions);
		}

		public void Test(int id)
		{

			string userId = "1";
			var leaderBoards = LeaderBoardContext.Collection();
			LeaderBoard playersLeaderBoard = leaderBoards.FirstOrDefault(i => i.UserId == userId);

		}
	}
}