using Microsoft.AspNetCore.Mvc;
using KatvaSoft.Com.SimpleFeedback.Service.Services;
using KatvaSoft.Com.SimpleFeedback.Service.Db;
using KatvaSoft.Com.SimpleFeedback.Service.Dto;
using System;

namespace KatvaSoft.Com.SimpleFeedback.Service.Controllers
{
    [Route("api/feedback")]
    public class FeedbackController : Controller 
    {
        FeedbackService _feedbackService;

        public FeedbackController(FeedbackService feedbackService)
        {
            this._feedbackService = feedbackService;
        }

        [HttpGet]
        public IActionResult ListAllFeedback()
        {

            return Ok(this._feedbackService.ListAllFeedbacks());

        }

        [HttpPut]
        public IActionResult UpdateFeedback(Feedback feedback)
        {
            return Ok(this._feedbackService.UpdateFeedback(feedback));
        }

        [HttpDelete("{feedbackId}")]
        public IActionResult RemoveFeedback(int feedbackId)
        {
            this._feedbackService.RemoveFeedback(feedbackId);
            return Ok();
        }

        [HttpPost("query")]
        public IActionResult QueryFeedback([FromBody] FeedbackQueryDto query)
        {
            return Ok(this._feedbackService.ListFeedbackWithQuery(query));
        }

        [HttpPost("comment")]
        public IActionResult SaveComment([FromBody]FeedbackCommentSaveDto dto)
        {
            return Ok(this._feedbackService.SaveFeedbackCommentAndHandledState(dto));
        }

        [HttpPost]
        public IActionResult SaveFeedback([FromBody] FeedbackDto feedbackDto)
        {
            
            if(feedbackDto.FeedbackDate == null || feedbackDto.FeedbackDate.Equals(DateTime.MinValue))
            {
                feedbackDto.FeedbackDate = DateTime.Now;
            }
            try
            {
                return Ok(this._feedbackService.SaveFeedback(feedbackDto));
            } catch (InvalidTokenException ite)
            {
                return Unauthorized(ite.Message);
            } 
            
        }

        [HttpGet("type/{clientToken}")]
        public IActionResult ListClientFeedbackTypes(string clientToken)
        {
            try
            {
                return Ok(this._feedbackService.ListClientFeedbackTypes(clientToken));
            } catch (InvalidTokenException ite)
            {
                return Unauthorized(ite.Message);
            }
        }
        
    }
}

