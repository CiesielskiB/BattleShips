namespace Battleships.DataAccess.SQL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class OnlineBattleAdd : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.OnlineBattles",
                c => new
                    {
                        Id = c.String(nullable: false, maxLength: 128),
                        Player1 = c.String(),
                        Player2 = c.String(),
                        Player1Board = c.String(),
                        Player2Board = c.String(),
                        ActivePlayer = c.Int(nullable: false),
                        GamePhase = c.Int(nullable: false),
                        Winner = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.OnlineBattles");
        }
    }
}
