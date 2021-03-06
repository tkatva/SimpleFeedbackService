﻿// <auto-generated />
using System;
using KatvaSoft.Com.SimpleFeedback.Service.Db;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace simple_feedback_service.Migrations
{
    [DbContext(typeof(SfsDbContext))]
    [Migration("20200209122947_FeedbackComment")]
    partial class FeedbackComment
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.2.6-servicing-10079")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("KatvaSoft.Com.SimpleFeedback.Service.Db.ClientApp", b =>
                {
                    b.Property<int>("ClientAppId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("ClientName");

                    b.Property<string>("ClientToken");

                    b.HasKey("ClientAppId");

                    b.ToTable("ClientApps");
                });

            modelBuilder.Entity("KatvaSoft.Com.SimpleFeedback.Service.Db.ClientFeedbackType", b =>
                {
                    b.Property<int>("ClientFeedbackTypeId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("ClientAppId");

                    b.Property<string>("ClientFeedbackTypeDesc");

                    b.Property<string>("ClientFeedbackTypeStr");

                    b.HasKey("ClientFeedbackTypeId");

                    b.HasIndex("ClientAppId");

                    b.ToTable("ClientFeedbackTypes");
                });

            modelBuilder.Entity("KatvaSoft.Com.SimpleFeedback.Service.Db.ClientFeedbackTypeSetting", b =>
                {
                    b.Property<int>("ClientFeedbackTypeSettingId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("ClientFeedbackTypeId");

                    b.Property<string>("ResendUrl");

                    b.HasKey("ClientFeedbackTypeSettingId");

                    b.HasIndex("ClientFeedbackTypeId");

                    b.ToTable("ClientFeedbackTypeSettings");
                });

            modelBuilder.Entity("KatvaSoft.Com.SimpleFeedback.Service.Db.FeedBackComment", b =>
                {
                    b.Property<int>("FeedbackCommentId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Comment");

                    b.Property<DateTime>("CommentDate");

                    b.Property<string>("CommentUser");

                    b.Property<int?>("FeedbackId");

                    b.HasKey("FeedbackCommentId");

                    b.HasIndex("FeedbackId");

                    b.ToTable("FeedBackComments");
                });

            modelBuilder.Entity("KatvaSoft.Com.SimpleFeedback.Service.Db.Feedback", b =>
                {
                    b.Property<int>("FeedbackId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("ClientAppId");

                    b.Property<string>("Comment");

                    b.Property<DateTime>("CommentDate");

                    b.Property<DateTime>("FeedbackDate");

                    b.Property<string>("FeedbackGiver");

                    b.Property<string>("FeedbackGiverEmail");

                    b.Property<bool>("FeedbackProcessed");

                    b.Property<string>("FeedbackSource");

                    b.Property<string>("FeedbackStr");

                    b.Property<string>("FeedbackType");

                    b.Property<string>("Response");

                    b.Property<DateTime>("ResponseDate");

                    b.HasKey("FeedbackId");

                    b.HasIndex("ClientAppId");

                    b.ToTable("Feedbacks");
                });

            modelBuilder.Entity("KatvaSoft.Com.SimpleFeedback.Service.Db.KeyValue", b =>
                {
                    b.Property<int>("KeyValueId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("ClientFeedbackTypeSettingId");

                    b.Property<string>("Key");

                    b.Property<string>("Value");

                    b.HasKey("KeyValueId");

                    b.HasIndex("ClientFeedbackTypeSettingId");

                    b.ToTable("KeyValues");
                });

            modelBuilder.Entity("KatvaSoft.Com.SimpleFeedback.Service.Db.ClientFeedbackType", b =>
                {
                    b.HasOne("KatvaSoft.Com.SimpleFeedback.Service.Db.ClientApp", "ClientApp")
                        .WithMany()
                        .HasForeignKey("ClientAppId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("KatvaSoft.Com.SimpleFeedback.Service.Db.ClientFeedbackTypeSetting", b =>
                {
                    b.HasOne("KatvaSoft.Com.SimpleFeedback.Service.Db.ClientFeedbackType", "ClientFeedbackType")
                        .WithMany()
                        .HasForeignKey("ClientFeedbackTypeId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("KatvaSoft.Com.SimpleFeedback.Service.Db.FeedBackComment", b =>
                {
                    b.HasOne("KatvaSoft.Com.SimpleFeedback.Service.Db.Feedback")
                        .WithMany("Comments")
                        .HasForeignKey("FeedbackId");
                });

            modelBuilder.Entity("KatvaSoft.Com.SimpleFeedback.Service.Db.Feedback", b =>
                {
                    b.HasOne("KatvaSoft.Com.SimpleFeedback.Service.Db.ClientApp", "ClientApp")
                        .WithMany()
                        .HasForeignKey("ClientAppId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("KatvaSoft.Com.SimpleFeedback.Service.Db.KeyValue", b =>
                {
                    b.HasOne("KatvaSoft.Com.SimpleFeedback.Service.Db.ClientFeedbackTypeSetting", "ClientFeedbackTypeSetting")
                        .WithMany("KeyValues")
                        .HasForeignKey("ClientFeedbackTypeSettingId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
