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
				
				model.WinRatio = (decimal)leaderBoard.Wins / leaderBoard.Loses;
			}
			return View(model);
        }
    }
}