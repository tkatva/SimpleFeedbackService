using KatvaSoft.Com.SimpleFeedback.Service;
using KatvaSoft.Com.SimpleFeedback.Service.Db;
using Microsoft.AspNetCore.Mvc.Testing;
using System.Net.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection.Extensions;

namespace KatvaSoft.SimpleFeedbackServiceTest
{
    public class FeedbackServiceBase
    {

        protected readonly HttpClient _client;

        public FeedbackServiceBase()
        {
            var appFactory = new WebApplicationFactory<Startup>()
                .WithWebHostBuilder(builder => {
                    builder.ConfigureServices(services => 
                    {
                        services.RemoveAll(typeof(SfsDbContext));
                        services.AddDbContext<SfsDbContext>(options =>
                        {
                            options.UseInMemoryDatabase("TestDb");
                        });
                    });
                });
            _client = appFactory.CreateClient();
        }
    }
}
