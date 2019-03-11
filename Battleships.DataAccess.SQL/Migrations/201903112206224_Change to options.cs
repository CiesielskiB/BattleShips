namespace Battleships.DataAccess.SQL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Changetooptions : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.PersonalOptions", "Image", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.PersonalOptions", "Image");
        }
    }
}
