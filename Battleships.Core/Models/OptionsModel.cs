namespace Battleships.Core.Models
{
	public class OptionsModel : BaseEntity
	{
		public string UserId { get; private set; }
		public int BoardSize { get; set; }
		public int[] ShipTypes { get; set; }

		public OptionsModel(string userId)
		{
			this.UserId = userId;
			BoardSize = 10;
			ShipTypes = new int[] {1, 1, 1, 1, 1};

		}
	}
}