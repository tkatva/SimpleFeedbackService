import { Feedback } from './../models/feedback.model'
import { ClientApp } from './../models/clientapp.model'
import { FeedbackQueryDTO, CommentSaveDTO } from './../models/feedback.query.dto'
import { FeedbackTypeSetting } from './../models/feedbacktype.setting.model'
import { ClientFeedbackType } from '../models/clientfeedbacktype.model';

export class SaveFeedback {
  static readonly type = "[FEEDBACK] Save"

  constructor(public payload: Feedback) { }

}

export class RemoveFeedback {
  static readonly type = "[FEEDBACK] Remove"

  constructor(public payload: Feedback) { }

}

export class ListFeedback {

  static readonly type = "[FEEDBACK] List"

  constructor(public payload: any) {}

}

export class ListAllFeedback {

  static readonly type = "[FEEDBACK] List all"

}

export class ListClientFeedbackTypes {

  static readonly type = "[FEEDBACK] List feedback types"

  constructor(public payload: string) {}
  
}

export class ListAllClientApps {

  static readonly type = "[ClientApp] List all"

}

export class SaveClientApp {

  static readonly type = "[ClientApp] Save"

  constructor(public payload: ClientApp) { }

}

export class RemoveClientApp {

  static readonly type = "[ClientApp] remove"

  constructor(public payload: number) { }

}

export class SaveComment {

  static readonly type = "[FEEDBACK] Save comment"

  constructor(public payload: CommentSaveDTO) { }

}

export class HideNotification {

  static readonly type = "[FEEDBACK] Hide notification"

}

export class ClearFeedbackTypeStates {

  static readonly type = "[FEEDBACKTYPE] Clear"

}

export class SaveFeedbackType {

  static readonly type = "[FEEDBACKTYPE] Save feedback type"

  constructor(public payload: ClientFeedbackType) { }

}

export class RemoveFeedbackType {

  static readonly type = "[FEEDBACKTYPE] Remove feedback type"

  constructor(public payload: ClientFeedbackType) { }

}

export class ClientSelectedAction {

  static readonly type = "[FEEDBACKTYPE] Client selected"

  constructor(public payload: ClientApp) { }
}

export class ListFeedbackTypeSettingsAction {

  static readonly type = "[FEEDBACKTYPE_SETTINGS] List"
  
  constructor(public payload: string) {}
}

export class SaveFeedbackTypeSettingAction {

  static readonly type = "[FEEDBACKTYPE_SETTINGS] Save"

  constructor(public payload: FeedbackTypeSetting) {}

}



