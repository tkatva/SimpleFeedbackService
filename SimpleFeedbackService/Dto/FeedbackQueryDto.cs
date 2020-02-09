using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KatvaSoft.Com.SimpleFeedback.Service.Dto
{
    public class FeedbackQueryDto
    {

        public String ClientToken { get; set; }

        public String FeedbackType { get; set; }

        public DateTime From { get; set; }

        public DateTime To { get; set; }

        public Boolean ShowHandled { get; set; }

    }
}
