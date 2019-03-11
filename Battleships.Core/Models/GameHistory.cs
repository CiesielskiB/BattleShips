using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Battleships.Core.Models
{
	public class GameHistory : BaseEntity
	{
		public string PlayerOneId { get;  set; }
		public string PlayerTwoId { get;  set; }
		public string Winner { get;  set; }
		public DateTimeOffset PlayedAt { get; set; }

		public GameHistory()
		{
			this.PlayedAt = DateTime.Now;
		}
	}

	
}
