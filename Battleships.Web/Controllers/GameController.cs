using Battleships.Core.Models;
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
			gameOptions.PlayersOptions = new OptionsModel
			{
				BoardSize = 10,
				ShipTypes = new int[] { 1, 1, 1, 1, 1 }
			};


			return View(gameOptions);
		}

		public void Test(int id)
		{
			//
		}
	}
}