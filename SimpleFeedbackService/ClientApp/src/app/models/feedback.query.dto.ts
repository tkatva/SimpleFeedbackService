export interface FeedbackQueryDTO {

  from: Date,
  to: Date,
  feedbackSource: string,
  feedbackType: string,
  showHandled: Boolean

}

export interface CommentSaveDTO {

  feedbackId: number,
  comment: string,
  handled: boolean
    
}
