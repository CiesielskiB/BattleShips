namespace Battleships.Core.Models
{
	public class PersonalOptions : BaseEntity
	{
		public string UserId { get; private set; }
		public string Image { get; set; }
		public int BoardSize { get; set; }
		public int Frigate { get; set; }
		public int Destroyer { get; set; }
		public int Cruiser { get; set; }
		public int Battleship { get; set; }
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

		public int[] getShips()
		{
			return (new int[] { Frigate, Destroyer, Cruiser, Battleship, Carrier });
		}
		
	}
}