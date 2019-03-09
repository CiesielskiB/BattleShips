namespace Battleships.DataAccess.SQL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class init2 : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.GameHistories",
                c => new
                    {
                        Id = c.String(nullable: false, maxLength: 128),
                        PlayerOneId = c.String(),
                        PlayerTwoId = c.String(),
                        Winner = c.String(),
                        PlayedAt = c.DateTimeOffset(nullable: false, precision: 7),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.LeaderBoards",
                c => new
                    {
                        Id = c.String(nullable: false, maxLength: 128),
                        UserId = c.String(),
                        Wins = c.Int(nullable: false),
                        Loses = c.Int(nullable: false),
                        MatchesPlayed = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.PersonalOptions",
                c => new
                    {
                        Id = c.String(nullable: false, maxLength: 128),
                        UserId = c.String(),
                        BoardSize = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.PersonalOptions");
            DropTable("dbo.LeaderBoards");
            DropTable("dbo.GameHistories");
        }
    }
}
