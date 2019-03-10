namespace Battleships.DataAccess.SQL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Personaloptionsupdate : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.PersonalOptions", "Frigate", c => c.Int(nullable: false));
            AddColumn("dbo.PersonalOptions", "Destroyer", c => c.Int(nullable: false));
            AddColumn("dbo.PersonalOptions", "Cruiser", c => c.Int(nullable: false));
            AddColumn("dbo.PersonalOptions", "Battleship", c => c.Int(nullable: false));
            AddColumn("dbo.PersonalOptions", "Carrier", c => c.Int(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.PersonalOptions", "Carrier");
            DropColumn("dbo.PersonalOptions", "Battleship");
            DropColumn("dbo.PersonalOptions", "Cruiser");
            DropColumn("dbo.PersonalOptions", "Destroyer");
            DropColumn("dbo.PersonalOptions", "Frigate");
        }
    }
}
