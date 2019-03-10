using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Battleships.Core.Models
{
	public class GameOptions
	{
		public bool Bot { get; set; }
		public String PlayerOne { get; set; }
		public String PlayerTwo { get; set; }
		public PersonalOptions PlayersOptions { get; set; }
	}
}
