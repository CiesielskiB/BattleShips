using Battleships.Core.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Battleships.Core.ViewModels
{
	public class GameOptions
	{
		public bool Bot { get; set; }
		public String PlayerOne { get; set; }
		public String PlayerTwo { get; set; }
		[DisplayFormat(DataFormatString = "{0:dd-MMM-yyyy}", ApplyFormatInEditMode = true)]
		public PersonalOptions PlayersOptions { get; set; }
	}
}
