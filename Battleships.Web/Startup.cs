using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(Battleships.Web.Startup))]
namespace Battleships.Web
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
