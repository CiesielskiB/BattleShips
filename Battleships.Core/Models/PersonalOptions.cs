namespace Battleships.Core.Models
{
	public class PersonalOptions : BaseEntity
	{
		public string UserId { get; private set; }
		public int BoardSize { get; set; }
		public int[] ShipTypes { get; set; }

		public PersonalOptions()
		{

		}

		public PersonalOptions(string userId)
		{
			this.UserId = userId;
			BoardSize = 10;
			ShipTypes = new int[] {1, 1, 1, 1, 1};

		}
		
	}
}