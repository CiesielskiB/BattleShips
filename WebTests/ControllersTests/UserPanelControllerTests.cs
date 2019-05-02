using System;
using System.Text;
using System.Collections.Generic;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Battleships.Web.Controllers;
using System.Linq;
using Moq;
using Battleships.Core.Contracts;
using Battleships.Core.Models;
using WebTests.Mocks;
using System.Web.Mvc;
using Battleships.Core.ViewModels;
using Battleships.Web;

namespace WebTests
{

	

	[TestClass]
	public class UserPanelControllerTests
	{
		public UserPanelController CreateController(List<PersonalOptions> options, List<LeaderBoard> leaderboard, List<GameHistory> gameHistory)
		{
			var optionsRepo = new RepositoryMock<PersonalOptions>();
			foreach(var ele in options)
			{
				optionsRepo.Insert(ele);
			}

			var leaderboardRepo = new RepositoryMock<LeaderBoard>();
			foreach (var ele in leaderboard)
			{
				leaderboardRepo.Insert(ele);
			}

			var gameHistoryRepo = new RepositoryMock<GameHistory>();
			foreach (var ele in gameHistory)
			{
				gameHistoryRepo.Insert(ele);
			}

			var controller = new UserPanelController(optionsRepo, leaderboardRepo, gameHistoryRepo);
			return controller;
		}


		private ControllerContext CreateControllerContextAs(string user, string id)
		{
			var controllerContextMock = new Mock<ControllerContext>();
			controllerContextMock.Setup(i => i.HttpContext.User.Identity.IsAuthenticated).Returns(true);
			controllerContextMock.Setup(i => i.HttpContext.User.Identity.Name).Returns(user);
			return controllerContextMock.Object;
		}

		[TestMethod]
		public void Leaderboard_LeaderboardsDoNotExist_ModelIsEmpty()
		{
			//Setup
			List<PersonalOptions> options = new List<PersonalOptions>(); 
			List<LeaderBoard> leaderboard = new List<LeaderBoard>(); 
			List<GameHistory> gameHistory = new List<GameHistory>();
			var controller = CreateController(options, leaderboard, gameHistory);
			controller.ControllerContext = CreateControllerContextAs("Test","1");
			controller.getUserId = () => "1";
			//Act
			var test = controller.Leaderboard() as ViewResult;
			var model = test.Model as UserPanelLeaderboardModel;
			//Assert
			Assert.IsInstanceOfType(test.Model, typeof(UserPanelLeaderboardModel));
			Assert.AreEqual(0, model.LeaderBoards.Count);
		}

		[TestMethod]
		public void Index_OptionsAreEmptyAndLeaderboardIsEmpty_ModelIsEmpty()
		{
			//Setup
			List<PersonalOptions> options = new List<PersonalOptions>();
			List<LeaderBoard> leaderboard = new List<LeaderBoard>();
			List<GameHistory> gameHistory = new List<GameHistory>();
			var controller = CreateController(options, leaderboard, gameHistory);
			controller.ControllerContext = CreateControllerContextAs("Test", "1");
			controller.getUserId = () => "1";
			//Act
			var test = controller.Index() as ViewResult;
			var model = test.Model as UserPanelIndexModel;
			//Assert
			Assert.IsInstanceOfType(test.Model, typeof(UserPanelIndexModel));
			Assert.AreEqual(0, model.Battleship);
			Assert.AreEqual(0, model.Frigate);
			Assert.AreEqual(0, model.Destroyer);
			Assert.AreEqual(0, model.Carrier);
			Assert.AreEqual(0, model.Cruiser);
			Assert.AreEqual(0, model.BoardSize);
			Assert.AreEqual(0, model.Wins);
			Assert.AreEqual(0, model.Loses);
			Assert.AreEqual(0, model.WinRatio);
		}

		[TestMethod]
		public void Index_ZeroWins_ZeroWinRatio()
		{
			//Setup
			List<PersonalOptions> options = new List<PersonalOptions>();
			options.Add(new PersonalOptions("1"));
			List<LeaderBoard> leaderboard = new List<LeaderBoard>();
			leaderboard.Add(new LeaderBoard("1")
			{
				Loses = 1,
				Wins = 0,
				MatchesPlayed = 1
			});
			List<GameHistory> gameHistory = new List<GameHistory>();
			var controller = CreateController(options, leaderboard, gameHistory);
			controller.ControllerContext = CreateControllerContextAs("Test", "1");
			controller.getUserId = () => "1";
			//Act
			var test = controller.Index() as ViewResult;
			var model = test.Model as UserPanelIndexModel;
			//Assert
			Assert.IsInstanceOfType(test.Model, typeof(UserPanelIndexModel));
			Assert.AreEqual(0, model.WinRatio);
		}

		[TestMethod]
		public void Index_OneWinAndOneLose_HalfWinRatio()
		{
			//Setup
			List<PersonalOptions> options = new List<PersonalOptions>();
			options.Add(new PersonalOptions("1"));
			List<LeaderBoard> leaderboard = new List<LeaderBoard>();
			leaderboard.Add(new LeaderBoard("1")
			{
				Loses = 1,
				Wins = 1,
				MatchesPlayed = 2
			});
			List<GameHistory> gameHistory = new List<GameHistory>();
			var controller = CreateController(options, leaderboard, gameHistory);
			controller.ControllerContext = CreateControllerContextAs("Test", "1");
			controller.getUserId = () => "1";
			//Act
			var test = controller.Index() as ViewResult;
			var model = test.Model as UserPanelIndexModel;
			//Assert
			Assert.IsInstanceOfType(test.Model, typeof(UserPanelIndexModel));
			Assert.AreEqual((decimal)0.5, model.WinRatio);
		}

		[TestMethod]
		public void Options_ModelIsNull_HttpNotFound()
		{
			//Setup
			List<PersonalOptions> options = new List<PersonalOptions>();
			List<LeaderBoard> leaderboard = new List<LeaderBoard>();
			List<GameHistory> gameHistory = new List<GameHistory>();
			var controller = CreateController(options, leaderboard, gameHistory);
			controller.ControllerContext = CreateControllerContextAs("Test", "1");
			controller.getUserId = () => "1";
			//Act
			var test = controller.Options();
			//Assert
			Assert.IsInstanceOfType(test, typeof(HttpNotFoundResult));
		}
		[TestMethod]
		public void Options_IdNotFound_HttpNotFound()
		{
			//Setup
			List<PersonalOptions> options = new List<PersonalOptions>();
			List<LeaderBoard> leaderboard = new List<LeaderBoard>();
			List<GameHistory> gameHistory = new List<GameHistory>();
			var controller = CreateController(options, leaderboard, gameHistory);
			controller.ControllerContext = CreateControllerContextAs("Test", "1");
			controller.getUserId = () => "1";
			//Act
			var test = controller.Options(new PersonalOptions(),"2");
			//Assert
			Assert.IsInstanceOfType(test, typeof(HttpNotFoundResult));
		}


	}
}
