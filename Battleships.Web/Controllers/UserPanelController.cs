using Microsoft.AspNet.Identity.Owin;
using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Battleships.Core.ViewModels;
using Battleships.Core.Models;
using Battleships.Core.Contracts;

namespace Battleships.Web.Controllers
{
	[Authorize]
	public class UserPanelController : Controller
    {


		private ApplicationUserManager _userManager;

		private IRepository<PersonalOptions> OptionsContext;
		private IRepository<LeaderBoard> LeaderBoardContext;
		private IRepository<GameHistory> GameHistoryContext;

		public UserPanelController(IRepository<PersonalOptions> OptionsContext, IRepository<LeaderBoard> LeaderBoardContext, IRepository<GameHistory> GameHistoryContext)
		{
			this.OptionsContext = OptionsContext;
			this.LeaderBoardContext = LeaderBoardContext;
			this.GameHistoryContext = GameHistoryContext;
		}

		public ApplicationUserManager UserManager
		{
			get
			{
				return _userManager ?? HttpContext.GetOwinContext().GetUserManager<ApplicationUserManager>();
			}
			private set
			{
				_userManager = value;
			}
		}

		// GET: UserPanel
		public ActionResult Index()
        {
			UserPanelIndexModel model = new UserPanelIndexModel();
			var userId = User.Identity.GetUserId();
			LeaderBoard leaderBoard = LeaderBoardContext.Collection().First(i => i.UserId == userId);
			PersonalOptions options = OptionsContext.Collection().First(i => i.UserId == userId);
			if(options != null && leaderBoard != null)
			{
				model.UserName = User.Identity.GetUserName();
				model.Image = options.Image;
				model.BoardSize = options.BoardSize;
				model.Frigate = options.Frigate;
				model.Destroyer = options.Destroyer;
				model.Cruiser = options.Cruiser;
				model.Battleship = options.Battleship;
				model.Carrier = options.Carrier;
				model.Wins = leaderBoard.Wins;
				model.Loses = leaderBoard.Loses;
				
				model.WinRatio = (decimal)leaderBoard.Wins /(leaderBoard.Loses+leaderBoard.Wins);
			}
			return View(model);
        }

		public ActionResult Leaderboard()
		{
			UserPanelLeaderboardModel model = new UserPanelLeaderboardModel();
			List<LeaderBoard> leaderBoards = LeaderBoardContext.Collection().ToList();
			// TODO order by wins, tiebreaker with winratio
			if(leaderBoards != null)
			{
				model.LeaderBoards = leaderBoards;
				int length = leaderBoards.Count;
				for (int i =0;i < length; i++)
				{
					var userId = leaderBoards[i].UserId;
					var image = OptionsContext.Collection().FirstOrDefault(k => k.UserId == userId).Image;
					var user = UserManager.FindById(userId);
					model.UserName.Add(user.UserName);
					model.Image.Add(image);
				}
			}
			return View(model);
		}

		public ActionResult PlayerDetails(string userId)
		{
			UserDetailsModel model = new UserDetailsModel();
			var user = UserManager.FindById(userId);
			var leaderBoard = LeaderBoardContext.Collection().FirstOrDefault(i => i.UserId == userId);
			var image = OptionsContext.Collection().FirstOrDefault(i => i.UserId == userId).Image;
			if (user != null && leaderBoard != null)
			{
				model.UserId = userId;
				model.UserName = user.UserName;
				model.Image = image;
				model.Wins = leaderBoard.Wins;
				model.Loses = leaderBoard.Loses;
				model.WinRatio = (decimal)leaderBoard.Wins /(leaderBoard.Wins + leaderBoard.Loses);
			}
			return View(model);
		}

		public ActionResult GameHistory()
		{
			UserPanelHistoryModel model = new UserPanelHistoryModel();
			string userId = User.Identity.GetUserId();
			model.Matches = GameHistoryContext.Collection().Where(i => i.PlayerOneId == userId || i.PlayerTwoId == userId).ToList();
			int length = model.Matches.Count;
			for(int i = 0;i < length; i++)
			{
				var playerOneId = model.Matches[i].PlayerOneId;
				var playerTwoId = model.Matches[i].PlayerTwoId;

				model.PlayerOne.Add(UserManager.FindById(playerOneId).UserName);
				model.PlayerTwo.Add(UserManager.FindById(playerTwoId).UserName);
				model.ImagePlayerOne.Add(OptionsContext.Collection().FirstOrDefault(k => k.UserId == playerOneId).Image);
				model.ImagePlayerTwo.Add(OptionsContext.Collection().FirstOrDefault(k => k.UserId == playerTwoId).Image);
			}

			return View(model);
		}

		
		public ActionResult FindPlayer(string searchQuery)
		{
			List<SearchUserModel> model = new List<SearchUserModel>();
			if(searchQuery!= null)
			{
				var users = UserManager.Users.Where(i => i.UserName.Contains(searchQuery));
				int lp = 1;
				foreach(var user in users)
				{
					SearchUserModel foundUser = new SearchUserModel();
					foundUser.lp = lp++;
					foundUser.UserId = user.Id;
					foundUser.UserName = user.UserName;
					foundUser.Image = OptionsContext.Collection().FirstOrDefault(i => i.UserId == user.Id).Image;
					model.Add(foundUser);
				}
			}

			return View(model);
		}

	}
}