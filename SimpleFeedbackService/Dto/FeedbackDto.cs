using System;
using System.ComponentModel.DataAnnotations;

namespace KatvaSoft.Com.SimpleFeedback.Service.Dto
{
    public class FeedbackDto
    {
        [Required]
        public String FeedbackStr { get; set; }

        public String FeedbackSource { get; set; }

        [Required]
        public String FeedbackGiverEmail { get; set; }

        public String FeedbackGiver { get; set; }

        [Required]
        public String FeedbackType { get; set; }

        public DateTime FeedbackDate { get; set; }

        [Required]
        public String ClientToken { get; set; }

    }
}
