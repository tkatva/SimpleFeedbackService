using System;
using System.Collections.Generic;
using System.Text;
using Xunit;
using KatvaSoft.Com.SimpleFeedback.Service.Db;
using System.Net.Http;
using Newtonsoft.Json;
using System.Threading.Tasks;

namespace KatvaSoft.SimpleFeedbackServiceTest
{
    public class SimpleFeedbackServiceTests : FeedbackServiceBase
    {

        [Fact]
        public async Task TestListClient()
        {
            var response =  await _client.GetAsync("api/client");
            Assert.True(response.IsSuccessStatusCode);
        }

        [Fact]
        public async Task TestAddClient()
        {
            var response = await _client.PostAsync("api/client", CreateHttpContentFromObject(CreateClientApp()));
            Assert.True(response.IsSuccessStatusCode);
        }

        [Fact]
        public async Task TestAddClientAndFeedbackType()
        {
            var response = await _client.PostAsync("api/client", CreateHttpContentFromObject(CreateClientApp()));
            Assert.True(response.IsSuccessStatusCode);
            var clientResp = await response.Content.ReadAsStringAsync();
            var clientApp = JsonConvert.DeserializeObject<ClientApp>(clientResp);
            var anotherResponse = await _client.PostAsync("api/client", CreateHttpContentFromObject(CreateFeedbackType(clientApp.ClientAppId)));
            Assert.True(anotherResponse.IsSuccessStatusCode);
        }

        private ClientApp CreateClientApp()
        {
            var clientApp = new ClientApp();
            clientApp.ClientName = "Test";
            clientApp.ClientToken = "111";
            return clientApp;
           
        }

        private ClientFeedbackType CreateFeedbackType(int clientId)
        {
            var feedbackType = new ClientFeedbackType();

            feedbackType.ClientAppId = clientId;
            feedbackType.ClientFeedbackTypeStr = "Suggestion";
            feedbackType.ClientFeedbackTypeDesc = "Just a suggestion";
            

            return feedbackType;
        }

        private HttpContent CreateHttpContentFromObject(Object obj)
        {
            var jsonStr = JsonConvert.SerializeObject(obj);
            return new StringContent(jsonStr, Encoding.UTF8, "application/json");
       
        }
    }
}
