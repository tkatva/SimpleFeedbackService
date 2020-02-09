using Microsoft.EntityFrameworkCore;


namespace KatvaSoft.Com.SimpleFeedback.Service.Db
{
    public class SfsDbContext : DbContext 
    {

        public SfsDbContext(DbContextOptions<SfsDbContext> options) : base(options)
        {
        }

        public DbSet<Feedback> Feedbacks { get; set; }

        public DbSet<ClientApp> ClientApps { get; set; }

        public DbSet<ClientFeedbackType> ClientFeedbackTypes { get; set; }

        public DbSet<ClientFeedbackTypeSetting> ClientFeedbackTypeSettings {get; set;}

        public DbSet<KeyValue> KeyValues {get; set;}

        public DbSet<FeedBackComment> FeedBackComments { get; set; }

    }
}
