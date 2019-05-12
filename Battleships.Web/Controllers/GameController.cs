using Battleships.Core.Contracts;
using Battleships.Core.Models;
using Battleships.Core.ViewModels;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Battleships.Web.Controllers
{
	[Authorize]
    public class GameController : Controller
    {
		IRepository<PersonalOptions> OptionsContext;
		IRepository<LeaderBoard> LeaderBoardContext;
		IRepository<GameHistory> GameHistoryContext;

		public Func<string> getUserId;

		public GameController(IRepository<PersonalOptions> OptionsContext, IRepository<LeaderBoard> LeaderBoardContext, IRepository<GameHistory> GameHistoryContext)
		{
			getUserId = () => User.Identity.GetUserId();
			this.OptionsContext = OptionsContext;
			this.LeaderBoardContext = LeaderBoardContext;
			this.GameHistoryContext = GameHistoryContext;
		}

		// GET: Game
		[AllowAnonymous]
		public ActionResult Index()
        {
			return View();
        }

		public ActionResult GameVsBot()
		{
			GameOptions gameOptions = new GameOptions();
			if (User.Identity.IsAuthenticated)
			{
				string userId = getUserId();
				gameOptions.PlayerOne = User.Identity.Name;
				gameOptions.PlayerTwo = "Bot";
				gameOptions.Bot = true;
				gameOptions.PlayersOptions = OptionsContext.Collection().FirstOrDefault(i => i.UserId.Equals(userId));
				if (gameOptions.PlayersOptions == null)
				{
					return RedirectToAction("Index", "Game");
				}
				return View(gameOptions);
			}
			else
			{
				return RedirectToAction("Index", "Game");
			}

			
		}

		//get
		public ActionResult GamevsPlayerLogIn()
		{
			return View();
		}

		//post
		[HttpPost]
		public ActionResult GamevsPlayerLogIn(SecondPlayerLoginModel user)
		{
			if (!ModelState.IsValid) 
			{
				return View(user);
			}
			if(user.UserName.ToLower().Equals(User.Identity.Name.ToLower())) // can't use the same user as the one logged in
			{
				ModelState.AddModelError("", "Can't play vs yourself :)");
				return View(user);
			}
			var getUser = HttpContext.GetOwinContext().GetUserManager<ApplicationUserManager>().FindByName(user.UserName);
			if (getUser != null) // if user exists lets check their pw
			{
				var hash = getUser.PasswordHash;
				var isCorrect = HttpContext.GetOwinContext().GetUserManager<ApplicationUserManager>().PasswordHasher.VerifyHashedPassword(hash, user.Password);
				if(isCorrect == PasswordVerificationResult.Success) // if everything is fine log him in and redirect to the game
				{
					TempData["username"] = user.UserName; //username for later use in actually game action
					return RedirectToAction("GameVsPlayer", "Game");
				}
			}
			ModelState.AddModelError("", "Wrong login or passowrd.");
			return View(user);
		}

		public ActionResult GameVsPlayer()
		{
			bool isLogged = TempData.TryGetValue("username", out object username);
			if (!isLogged) return RedirectToAction("Index", "Game");
			TempData.Clear();
			GameOptions gameOptions = new GameOptions();
			if (User.Identity.IsAuthenticated)
			{
				string userId = getUserId();
				gameOptions.PlayerOne = User.Identity.Name;
				gameOptions.PlayerTwo = (string)username;
				gameOptions.Bot = false;
				gameOptions.PlayersOptions = OptionsContext.Collection().First(i => i.UserId.Equals(userId));
				if (gameOptions.PlayersOptions == null)
				{
					return RedirectToAction("Index", "Game");
				}
			}
			return View(gameOptions);
		}

		public void GameSave(string winner, string loser)
		{
			string winnerId = HttpContext.GetOwinContext().GetUserManager<ApplicationUserManager>().FindByName(winner).Id;
			string LoserId = HttpContext.GetOwinContext().GetUserManager<ApplicationUserManager>().FindByName(loser).Id;
			var leaderBoards = LeaderBoardContext.Collection();

			LeaderBoard winnerLeaderBoard = leaderBoards.FirstOrDefault(i => i.UserId == winnerId);
			LeaderBoard loserLeaderBoard = leaderBoards.FirstOrDefault(i => i.UserId == LoserId);
			winnerLeaderBoard.MatchesPlayed++;
			loserLeaderBoard.MatchesPlayed++;

			winnerLeaderBoard.Wins++;
			loserLeaderBoard.Loses++;

			LeaderBoardContext.Update(winnerLeaderBoard);
			LeaderBoardContext.Update(loserLeaderBoard);
			LeaderBoardContext.Commit();

			var playerOneId = getUserId();
			GameHistory newGame = new GameHistory
			{
				PlayerOneId = playerOneId,
				PlayerTwoId = String.Equals(playerOneId, winnerId) ? LoserId : winnerId,
				Winner = winnerId
			};
			GameHistoryContext.Insert(newGame);
			GameHistoryContext.Commit();
		}

		public ActionResult Lobby()
		{
			var model = new LobbyViewModel();
			model.CurrentUser = User.Identity.Name;
			model.UserList = new List<string>();
			foreach(var user in HttpContext.GetOwinContext().GetUserManager<ApplicationUserManager>().Users.ToList())
			{
				if (!model.CurrentUser.Equals(user.UserName))
				{
					model.UserList.Add(user.UserName);
				}
			}

			return View(model);
		}

	}
}