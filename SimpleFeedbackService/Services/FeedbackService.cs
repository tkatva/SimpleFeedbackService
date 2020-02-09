using System;
using System.Collections.Generic;
using System.Linq;
using KatvaSoft.Com.SimpleFeedback.Service.Db;
using KatvaSoft.Com.SimpleFeedback.Service.Dto;
using Microsoft.EntityFrameworkCore;

namespace KatvaSoft.Com.SimpleFeedback.Service.Services
{
    public class FeedbackService
    {
        SfsDbContext _sfsDbContext;

        public FeedbackService(SfsDbContext SfsDbContextParam)
        {
            this._sfsDbContext = SfsDbContextParam;
        }

        public void RemoveFeedback(int feedbackId)
        {
            var feedback = this._sfsDbContext.Feedbacks.Find(feedbackId);

            if(feedback != null)
            {
                this._sfsDbContext.Remove(feedback);
            }
            this._sfsDbContext.SaveChanges();
        }

        public void RemoveFeedbackType(int feedbackTypeId)
        {
            var feedback = this._sfsDbContext.ClientFeedbackTypes.Find(feedbackTypeId);

            if (feedback != null)
            {
                this._sfsDbContext.Remove(feedback);
            }
            this._sfsDbContext.SaveChanges();
        }

        public List<ClientFeedbackType> ListClientFeedbackTypes(string clientToken)
        {
            var clientApp = this.FindClientWithToken(clientToken);
            
            if(clientApp == null)
            {
                throw new InvalidTokenException("Invalid client token");
            }

            return this._sfsDbContext.ClientFeedbackTypes.Where(cft => cft.ClientAppId.Equals(clientApp.ClientAppId)).ToList();
                                
        }

        public List<ClientFeedbackType> ListAllClientFeedbackTypes()
        {
            return this._sfsDbContext.ClientFeedbackTypes.ToList();
        }

        public List<ClientFeedbackType> ListClientAppFeedbackTypes(int clientAppId)
        {
            return this._sfsDbContext.ClientFeedbackTypes.Where(cft => cft.ClientAppId == clientAppId).ToList();
        }

        //TODO: Refactor this so that DbContext function is given as parameter and all entities inherent from SuperClass which has Id as primary key
        //so all save functionality can be generalized
        public ClientFeedbackType SaveFeedbackType(ClientFeedbackType feedbackType)
        {
           
            if (feedbackType.ClientFeedbackTypeId == 0)
            {
                var savedEntity = this._sfsDbContext.ClientFeedbackTypes.Add(feedbackType);
                this._sfsDbContext.SaveChanges();
                return savedEntity.Entity;
            }
            else
            {
                var savedEntity = this._sfsDbContext.ClientFeedbackTypes.Update(feedbackType);
                this._sfsDbContext.SaveChanges();
                return savedEntity.Entity;
            }
        }

        public List<Feedback> ListAllFeedbacks()
        {

            return this._sfsDbContext.Feedbacks.ToList();

        }

        public Feedback SaveFeedbackCommentAndHandledState(FeedbackCommentSaveDto dto)
        {

            var feedback = this._sfsDbContext.Feedbacks.Find(dto.FeedbackId);
            if(feedback != null)
            {
                feedback.Comment = dto.Comment;
                feedback.FeedbackProcessed = dto.Handled;
                return this.UpdateFeedback(feedback);
            } else
            {
                return null;
            }

        }

        public Feedback UpdateFeedback(Feedback feedback)
        {
            var saved = this._sfsDbContext.Update(feedback);
            this._sfsDbContext.SaveChanges();
            return saved.Entity;
        }

        public Feedback SaveFeedback(FeedbackDto feedbackDto)
        {

            var clientApp = FindClientWithToken(feedbackDto.ClientToken);

            if(clientApp == null)
            {
                throw new InvalidTokenException("Invalid token");
            }

            Feedback feedback = new Feedback
            {
                FeedbackStr = feedbackDto.FeedbackStr,
                FeedbackSource = feedbackDto.FeedbackSource,
                FeedbackGiverEmail = feedbackDto.FeedbackGiverEmail,
                FeedbackGiver = feedbackDto.FeedbackGiver,
                FeedbackType = feedbackDto.FeedbackType,
                FeedbackDate = feedbackDto.FeedbackDate,
                ClientApp = clientApp,
                FeedbackProcessed = false

            };

            var fback = this._sfsDbContext.Add(feedback);
            this._sfsDbContext.SaveChanges();
            //TODO: Add additional processing steps here. -> Send Slack message from feedback and/or send email from feedback. 

            return fback.Entity;

        }

        public List<Feedback> ListFeedbackWithQuery(FeedbackQueryDto feedbackQueryDto)
        {
            ClientApp clientApp = null;
            if(feedbackQueryDto.ClientToken != null)
            {
                clientApp = FindClientWithToken(feedbackQueryDto.ClientToken);
            }

            var feedbacks = this._sfsDbContext.Feedbacks
                .Include(x => x.ClientApp)
                .Where(
                 fb =>
                    (clientApp == null || fb.ClientAppId.Equals(clientApp.ClientAppId)) &&
                    (fb.FeedbackProcessed == feedbackQueryDto.ShowHandled ) &&
                    (feedbackQueryDto.FeedbackType == null || fb.FeedbackType.Equals(feedbackQueryDto.FeedbackType, StringComparison.CurrentCultureIgnoreCase)) &&
                    (feedbackQueryDto.From == DateTime.MinValue || fb.FeedbackDate >= feedbackQueryDto.From) &&
                    (feedbackQueryDto.To == DateTime.MinValue || fb.FeedbackDate <= feedbackQueryDto.To)
                )
                
                .ToList();
            feedbacks.ForEach(feedback => feedback.FeedbackSource = feedback.ClientApp.ClientName);
            return feedbacks;
        }

        private ClientApp FindClientWithToken(string token)
        {

            return this._sfsDbContext.ClientApps.Where(ca => ca.ClientToken == token)
                                                .FirstOrDefault();

        }

    }

    public class InvalidTokenException : System.Exception
    {
        public InvalidTokenException() : base() { }

        public InvalidTokenException(string message) : base(message) { }
    }
}
