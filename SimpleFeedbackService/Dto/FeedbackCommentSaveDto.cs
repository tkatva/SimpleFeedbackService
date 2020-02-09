using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KatvaSoft.Com.SimpleFeedback.Service.Dto
{
    public class FeedbackCommentSaveDto
    {

        public Int32 FeedbackId { get; set; }

        public String Comment { get; set; }

        public Boolean Handled { get; set; }

    }
}
