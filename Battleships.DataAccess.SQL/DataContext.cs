using Battleships.Core.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Battleships.DataAccess.SQL
{
	public class DataContext : DbContext
	{
		public DataContext()
			: base("DefaultConnection")
		{
		}


		public DbSet<GameHistory> GameHistories { get; set; }
		public DbSet<LeaderBoard> LeaderBoards { get; set; }
		public DbSet<PersonalOptions> PersonalOptions { get; set; }
		public DbSet<OnlineBattle> OnlineBattles { get; set; }

	}
}