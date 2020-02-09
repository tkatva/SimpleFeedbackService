using Microsoft.AspNetCore.Mvc;
using KatvaSoft.Com.SimpleFeedback.Service.Services;
using KatvaSoft.Com.SimpleFeedback.Service.Db;
using KatvaSoft.Com.SimpleFeedback.Service.Dto;
using System;
using System.Collections.Generic;

namespace KatvaSoft.Com.SimpleFeedback.Service.Controllers
{
    [Route("api/client")]
    public class ClientController : Controller
    {
        FeedbackService _feedbackService;
        ClientService _clientService;

        public ClientController(FeedbackService feedbackService, ClientService clientService)
        {
            this._feedbackService = feedbackService;
            this._clientService = clientService;
        }

        [HttpGet]
        public IActionResult ListClientApps()
        {
            return Ok(this._clientService.ListClientApps());
        }


        [HttpDelete("{clientAppId}")]
        public IActionResult RemoveFeedback(int clientAppId)
        {
            this._clientService.RemoveClient(clientAppId);
            return Ok();
        }

        [HttpPost]
        public IActionResult SaveClienApp([FromBody] ClientApp clientApp)
        {
        
            try
            {
                return Ok(this._clientService.SaveClientApp(clientApp));
            }
            catch (InvalidTokenException ite)
            {
                return Unauthorized(ite.Message);
            }

        }

    }

    [Route("api/feedbacktype")]
    public class FeedbackTypeController : Controller
    {
        FeedbackService _feedbackService;

        public FeedbackTypeController(FeedbackService feedbackService)
        {
            this._feedbackService = feedbackService;
        }

        [HttpGet("{clientAppId}")]
        public IActionResult ListClientFeedbackTypes(int clientAppId)
        {
            return Ok(this._feedbackService.ListClientAppFeedbackTypes(clientAppId));
        }
      
        [HttpDelete("{feedbackTypeId}")]
        public IActionResult RemoveFeedbackType(int feedbackTypeId)
        {
            this._feedbackService.RemoveFeedbackType(feedbackTypeId);
            return Ok(feedbackTypeId);
        }

        [HttpPost]
        public IActionResult SaveClientFeedbackType([FromBody] ClientFeedbackType clientFeedbackType)
        {
            return Ok(this._feedbackService.SaveFeedbackType(clientFeedbackType));
        }
        
    }
}
