using Microsoft.AspNetCore.Mvc;
using KatvaSoft.Com.SimpleFeedback.Service.Services;
using KatvaSoft.Com.SimpleFeedback.Service.Db;
using KatvaSoft.Com.SimpleFeedback.Service.Dto;
using System;
using System.Linq;

namespace KatvaSoft.Com.SimpleFeedback.Service.Controllers
{
    [Route("api/settings")]
    public class SettingsController : Controller {
        FeedbackSettingsService _feedbackSettingService;

         public SettingsController(FeedbackSettingsService feedbackSettingService)
        {
            this._feedbackSettingService = feedbackSettingService;
        }

        [HttpGet("{feedbackTypeId}")]
        public IActionResult ListFeedbackTypeSettings(int feedbackTypeId) {
            
            var settings = this._feedbackSettingService.ListClientFeedbackTypeSettings(feedbackTypeId)
            .Select( f => new FeedbackTypeSettingDto {
                ClientFeedbackTypeId = f.ClientFeedbackTypeId,
                ResendUrl = f.ResendUrl,
                ClientFeedbackTypeSettingId = f.ClientFeedbackTypeSettingId,
                KeyValues = f.KeyValues.Select(kv => new KeyValueDto{
                    KeyValueId = kv.KeyValueId,
                    Key = kv.Key,
                    Value = kv.Value
                }).ToList()
            }).ToList();

            return Ok(settings);
        }

        [HttpPost]
        public IActionResult SaveFeedbackTypeSetting([FromBody] FeedbackTypeSettingDto clientFeedbackTypeSetting) {
            ClientFeedbackTypeSetting setting = this._feedbackSettingService.FindWithId(clientFeedbackTypeSetting.ClientFeedbackTypeSettingId);
            if (setting != null) {
                setting = MapToEntity(clientFeedbackTypeSetting, setting);
            } else {
                setting = MapToEntity(clientFeedbackTypeSetting, new ClientFeedbackTypeSetting());
            }
            return Ok(this._feedbackSettingService.SaveClientFeedbackTypeSetting(setting));
        }

        [HttpDelete("{feedbackSettingId}")]
        public IActionResult RemoveFeedbackTypeSetting(int feedbackSettingId) {
            this._feedbackSettingService.RemoveClientFeedbackTypeSetting(feedbackSettingId);
            return Ok();
        }

        private ClientFeedbackTypeSetting MapToEntity(FeedbackTypeSettingDto dto, ClientFeedbackTypeSetting entity) {
            
            entity.ResendUrl = dto.ResendUrl;
            entity.ClientFeedbackTypeId = dto.ClientFeedbackTypeId;

            if(dto.KeyValues != null) {
                entity.KeyValues = dto.KeyValues.Select(kv => new KeyValue{
                    Key = kv.Key,
                    Value = kv.Value
                }).ToList();
            }

            return entity;
        }
    }
}