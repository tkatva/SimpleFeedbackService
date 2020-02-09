using System;
using System.Collections.Generic;
using System.Linq;
using KatvaSoft.Com.SimpleFeedback.Service.Db;
using KatvaSoft.Com.SimpleFeedback.Service.Dto;
using Microsoft.EntityFrameworkCore;

namespace KatvaSoft.Com.SimpleFeedback.Service.Services
{
    public class FeedbackSettingsService {
        SfsDbContext _sfsDbContext;


        public FeedbackSettingsService(SfsDbContext SfsDbContextParam)
        {
            this._sfsDbContext = SfsDbContextParam;
        }

        public List<ClientFeedbackTypeSetting> ListClientFeedbackTypeSettings(Int32 feedbackTypeId) {

            return this._sfsDbContext.ClientFeedbackTypeSettings.Where(cfts => cfts.ClientFeedbackTypeId == feedbackTypeId)
            .Include(cfts => cfts.KeyValues)
            .ToList();

        }

        public ClientFeedbackTypeSetting FindWithId(Int32 feedbackTypeSettingId) {
            return this._sfsDbContext.ClientFeedbackTypeSettings.Find(feedbackTypeSettingId);
        }

        public ClientFeedbackTypeSetting SaveClientFeedbackTypeSetting(ClientFeedbackTypeSetting clientFeedbackTypeSetting) {
            if(clientFeedbackTypeSetting.ClientFeedbackTypeSettingId == 0) {
                var savedEntity = this._sfsDbContext.ClientFeedbackTypeSettings.Add(clientFeedbackTypeSetting);
                this._sfsDbContext.SaveChanges();
                return savedEntity.Entity;
            } else {
                 var savedEntity = this._sfsDbContext.ClientFeedbackTypeSettings.Update(clientFeedbackTypeSetting);
                this._sfsDbContext.SaveChanges();
                return savedEntity.Entity;
            }
        }

        public void RemoveClientFeedbackTypeSetting(Int32 clientFeedbackTypeSettingId) {
            var clientFeedbackTypeSetting = this._sfsDbContext.ClientFeedbackTypeSettings.Find(clientFeedbackTypeSettingId);
            if (clientFeedbackTypeSetting != null) {
                this._sfsDbContext.ClientFeedbackTypeSettings.Remove(clientFeedbackTypeSetting);
                this._sfsDbContext.SaveChanges();
                
            }
        }

    }
}