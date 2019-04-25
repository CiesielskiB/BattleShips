using System;
using Battleships.Core.Models;
using Battleships.Web.Controllers;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using WebTests.Mocks;
using System.Web.Mvc;
using System.Security.Claims;
using System.Security.Principal;

namespace WebTests
{

	[TestClass]
	public class GameControllerTests
	{
		GameController CreateGameControllerAs(string userName, string id)
		{
			var controllerContextMock = new Mock<ControllerContext>();
			controllerContextMock.Setup(i => i.HttpContext.User.Identity.IsAuthenticated).Returns(true);
			controllerContextMock.Setup(i => i.HttpContext.User.Identity.Name).Returns(userName);
			GameController controller = CreateGameController();
			controller.getUserId = () => id;
			controller.ControllerContext = controllerContextMock.Object;


			return controller;
		}

		GameController CreateGameController()
		{
			RepositoryMock<PersonalOptions> OptionsContext = new RepositoryMock<PersonalOptions>();
			RepositoryMock<LeaderBoard> LeaderBoardContext = new RepositoryMock<LeaderBoard>();
			RepositoryMock<GameHistory> GameHistoryContext = new RepositoryMock<GameHistory>();

			GameController controller = new GameController(OptionsContext, LeaderBoardContext, GameHistoryContext);
			return controller;
		}

		[TestMethod]
		public void TestGameVsBot()
		{
			//Arrange
			var controller = CreateGameControllerAs("Test", "1");
			//Act
			var gameVsBot = controller.GameVsBot();
			//Assert
			Assert.IsInstanceOfType(gameVsBot, typeof(RedirectToRouteResult));

		}
	}
}
