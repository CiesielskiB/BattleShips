using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Battleships.Core.Models
{
	public class BaseEntity
	{
		public string Id { get; set; }

		public BaseEntity()
		{
			Id = Guid.NewGuid().ToString();
		}
	}
}
