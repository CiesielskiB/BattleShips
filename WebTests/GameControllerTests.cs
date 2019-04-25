using System;
using Battleships.Core.Models;
using Battleships.Web.Controllers;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using WebTests.Mocks;
using System.Web.Mvc;
using System.Security.Claims;
using System.Security.Principal;
using Battleships.Core.ViewModels;

namespace WebTests
{

	[TestClass]
	public class GameControllerTests
	{
		GameController CreateGameControllerAs(string userName, string id, bool withOptions)
		{
			var controllerContextMock = new Mock<ControllerContext>();
			controllerContextMock.Setup(i => i.HttpContext.User.Identity.IsAuthenticated).Returns(true);
			controllerContextMock.Setup(i => i.HttpContext.User.Identity.Name).Returns(userName);
			GameController controller = CreateGameController(id, withOptions);
			controller.getUserId = () => id;
			controller.ControllerContext = controllerContextMock.Object;


			return controller;
		}

		GameController CreateGameController(string id, bool withOptions)
		{
			RepositoryMock<PersonalOptions> OptionsContext = new RepositoryMock<PersonalOptions>();
			if (withOptions)
			{
				var sample = new PersonalOptions(id);
				OptionsContext.Insert(sample);
			}
			RepositoryMock<LeaderBoard> LeaderBoardContext = new RepositoryMock<LeaderBoard>();
			RepositoryMock<GameHistory> GameHistoryContext = new RepositoryMock<GameHistory>();

			GameController controller = new GameController(OptionsContext, LeaderBoardContext, GameHistoryContext);
			return controller;
		}

		[TestMethod]
		public void gameVSBot_NoPersonalOptions_RedirectResult()
		{
			//Arrange
			var controller = CreateGameControllerAs("Test", "1",false);
			//Act
			var gameVsBot = controller.GameVsBot();
			//Assert
			Assert.IsInstanceOfType(gameVsBot, typeof(RedirectToRouteResult));

		}

		[TestMethod]
		public void gameVSBot_PersonalOptionsExist_ViewResult()
		{
			//Arrange
			var controller = CreateGameControllerAs("Test", "1",true);
			//Act
			var gameVsBot = controller.GameVsBot() as ViewResult;
			var viewModel = gameVsBot.Model as GameOptions;
			
			//Assert
			Assert.IsInstanceOfType(gameVsBot, typeof(ViewResult));

		}

		[TestMethod]
		public void gameVPlayer_IsNotLogged_RedirectResult()
		{
			//Arrange
			var controller = CreateGameControllerAs("Test", "1", true);
			//Act
			var gameVsPlayer = controller.GameVsPlayer();

			//Assert
			Assert.IsInstanceOfType(gameVsPlayer, typeof(RedirectToRouteResult));

		}

		[TestMethod]
		public void gameVPlayer_IsLoggedAndHasOptions_RedirectResult()
		{
			//Arrange
			var controller = CreateGameControllerAs("Test", "1", true);
			controller.TempData["username"] = "mock";
			//Act
			var gameVsPlayer = controller.GameVsPlayer();

			//Assert
			Assert.IsInstanceOfType(gameVsPlayer, typeof(ViewResult));

		}


	}
}
