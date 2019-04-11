using System;
using Battleships.Core.Models;
using Battleships.Web.Controllers;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using WebTests.Mocks;
using System.Web.Mvc;
using System.Security.Claims;

namespace WebTests
{
	[TestClass]
	public class GameControllerTests
	{
		GameController CreateGameControllerAs(string userName, string id)
		{
			var claim = new Claim("test", id);
			var mockIdentity = Mock.Of<ClaimsIdentity>(ci => ci.FindFirst(It.IsAny<string>()) == claim);

			var mockContext = Mock.Of<ControllerContext>(cc => cc.HttpContext.User.Identity == mockIdentity);
		

			GameController controller = CreateGameController();
			controller.ControllerContext = mockContext;

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
