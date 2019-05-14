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

		public void Send(string name, string message)
		{
			// Call the addNewMessageToPage method to update clients.
			Clients.All.addNewMessageToPage(name, message);
		}

		public void Feedback(string name,string caller)
		{
			Clients.Group(caller).LogInUser(name);
		}



	}
}