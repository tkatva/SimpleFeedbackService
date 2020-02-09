export interface FeedbackTypeSetting {

    feedbackTypeSettingId: number,
    resendUrl: String,
    clientFeedbackTypeId: number
    keyValues: KeyValue[]

}

 export interface KeyValue {

    keyValueId: number,
    key: string,
    value: string


 }