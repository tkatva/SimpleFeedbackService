using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace KatvaSoft.Com.SimpleFeedback.Service.Dto
{

    public class FeedbackTypeSettingDto {

        public Int32 ClientFeedbackTypeSettingId {get; set;}

        public String ResendUrl {get; set;}

        public Int32 ClientFeedbackTypeId {get; set;}

        public List<KeyValueDto> KeyValues {get; set;}
        
    }

    public class KeyValueDto {

        public Int32 KeyValueId {get; set;}

        public String Key {get; set;}

        public String Value {get; set;}

    }


}