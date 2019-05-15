using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using Microsoft.AspNet.SignalR;

namespace Battleships.Web
{
	public class LobbyHub : Hub
	{
		private readonly static ConnectionMapping<string> _connections =
			new ConnectionMapping<string>();


		public override Task OnConnected()
		{
			string name = Context.User.Identity.Name;
			_connections.Add(name, Context.ConnectionId);
			Groups.Add(Context.ConnectionId, name);
			Clients.Others.LogInUser(name);

			return base.OnConnected();
		}

		public override Task OnDisconnected(bool stopCalled)
		{
			string name = Context.User.Identity.Name;
			_connections.Remove(name, Context.ConnectionId);
			Clients.Others.LogOutUser(name);
			return base.OnDisconnected(stopCalled);
		}

		public void Send(string name, string message)
		{
			// Call the addNewMessageToPage method to update clients.
			Clients.All.addNewMessageToPage(name, message);
		}

		public void Feedback(string name,string caller)
		{
			Clients.Group(caller).LogInUser(name);
		}

		public void ChallengeToBattle(string enemy, string challenger)
		{
			Clients.Group(enemy).OpenChallengeDialog(challenger);
		}


		// check how it works with other hub to provide fight information
		public void BattleAnswer(bool decision, string reciever)
		{
			if (decision)
			{
				Clients.Group(reciever).AcceptChallenge();
			}
			else
			{
				Clients.Group(reciever).DeclineChallenge();
			}
		}

		public void CancelInvitation(string reciever)
		{
			Clients.Group(reciever).InformAboutCanceling();
		}

	}
}