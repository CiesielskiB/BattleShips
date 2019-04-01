using System.ComponentModel.DataAnnotations;

namespace Battleships.Core.Models
{
	public class PersonalOptions : BaseEntity
	{
		public string UserId { get; private set; }
		public string Image { get; set; }
		[Range(10, 15, ErrorMessage = "Value for Battlefield size must be between {1} and {2}.")]
		public int BoardSize { get; set; }
		[Range(1, 4, ErrorMessage = "number of Frigates must be between {1} and {2}.")]
		public int Frigate { get; set; }
		[Range(1, 3, ErrorMessage = "number of Destroyers must be between {1} and {2}.")]
		public int Destroyer { get; set; }
		[Range(1, 3, ErrorMessage = "number of Cruisers must be between {1} and {2}.")]
		public int Cruiser { get; set; }
		[Range(1, 2, ErrorMessage = "number of Battleships must be between {1} and {2}.")]
		public int Battleship { get; set; }
		[Range(1, 2, ErrorMessage = "number of Carriers must be between {1} and {2}.")]
		public int Carrier { get; set; }

		public PersonalOptions()
		{
		}

		public PersonalOptions(string userId)
		{
			this.UserId = userId;
			BoardSize = 10;
			Frigate = 1;
			Destroyer = 1;
			Cruiser = 1;
			Battleship = 1;
			Carrier = 1;
		}

		public int[] GetShips()
		{
			return (new int[] { Frigate, Destroyer, Cruiser, Battleship, Carrier });
		}
		
	}
}