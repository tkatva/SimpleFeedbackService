using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KatvaSoft.Com.SimpleFeedback.Service.Db
{
    
    public class Feedback
    {

        public Int32 FeedbackId { get; set; }

        public String FeedbackStr { get; set; }

        public String FeedbackSource { get; set; }

        public String FeedbackGiverEmail { get; set; }

        public String FeedbackGiver { get; set; }

        public String FeedbackType { get; set; }

        public DateTime FeedbackDate { get; set; }

        public Boolean FeedbackProcessed { get; set; }

        public String Comment { get; set; }

        public DateTime CommentDate {get; set;}

        public String Response { get; set; }

        public DateTime ResponseDate {get; set;}

        public Int32 ClientAppId { get; set; }

        public ClientApp ClientApp { get; set; }

        public List<FeedBackComment> Comments { get; set; }

    }

    public class ClientApp
    {

        public Int32 ClientAppId { get; set; }

        public String ClientName { get; set; }

        public String ClientToken { get; set; }

    }

    public class ClientFeedbackType
    {

        public Int32 ClientFeedbackTypeId { get; set; }

        public String ClientFeedbackTypeStr { get; set; }

        public String ClientFeedbackTypeDesc { get; set; }

        public Int32 ClientAppId { get; set; }

        public ClientApp ClientApp { get; set; }

    }

    public class ClientFeedbackTypeSetting 
    {
        public Int32 ClientFeedbackTypeSettingId {get; set;}

        public String ResendUrl {get; set;}

        public Int32 ClientFeedbackTypeId {get; set;}

        public ClientFeedbackType ClientFeedbackType {get; set;}

        public List<KeyValue> KeyValues {get; set;}
    }

    public class KeyValue {

        public Int32 KeyValueId {get; set;}

        public String Key {get; set;}

        public String Value {get; set;}

        public Int32 ClientFeedbackTypeSettingId {get; set;}

        public ClientFeedbackTypeSetting ClientFeedbackTypeSetting {get; set;}

    }

    public class FeedBackComment
    {
        public Int32 FeedbackCommentId { get; set; }

        public String Comment { get; set; }

        public String CommentUser { get; set; }

        public DateTime CommentDate { get; set; }
    }

}
