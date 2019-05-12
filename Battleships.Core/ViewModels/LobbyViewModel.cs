using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Battleships.Core.ViewModels
{
	public class LobbyViewModel
	{
		public string CurrentUser { get; set; }
		public List<string> UserList { get; set; }
	}
}
