import { State, Action, StateContext, Selector, Store } from '@ngxs/store';
import { Feedback } from './../models/feedback.model'
import { ClientFeedbackType, ClientApp } from './../models/clientfeedbacktype.model'
import { FeedbackTypeSetting } from './../models/feedbacktype.setting.model'
import {
  SaveFeedback, ListAllFeedback, ListClientFeedbackTypes, ListAllClientApps, ListFeedback, SaveComment, HideNotification,
  SaveClientApp, RemoveClientApp, SaveFeedbackType, RemoveFeedbackType, ClearFeedbackTypeStates,
  ClientSelectedAction,ListFeedbackTypeSettingsAction, SaveFeedbackTypeSettingAction
} from './../actions/feedback.action'
import { BaseHttpService } from './../services/BaseHttpService'


export class FeedbackStateModel {

  feedbacks: Feedback[]
  feedbackTypes: ClientFeedbackType[]
  clientApps: ClientApp[]
  settings: FeedbackTypeSetting[]
  selectedFeedback: Feedback
  loading: boolean
  faulted: boolean
  actionSuccesful: boolean
  exceptionInfo: string
  notificationMsg: string
  selectedClient: ClientApp
  selectedFeedBackType: ClientFeedbackType

}

@State<FeedbackStateModel>({
  name: 'feedbacks',
  defaults: {
    feedbacks: [],
    feedbackTypes: [],
    clientApps: [],
    settings: [],
    selectedFeedback: null,
    loading: false,
    faulted: false,
    actionSuccesful: false,
    exceptionInfo: null,
    notificationMsg : null,
    selectedClient: null,
    selectedFeedBackType: null
  }
})
export class FeedbackState {

  constructor(private http: BaseHttpService) {
    http.setApiUrlPostfix('feedback')

  }

  @Selector()
  public static loading(state: FeedbackStateModel) {
    return state.loading
  }

  @Selector()
  public static successState(state: FeedbackStateModel) {
    return state.actionSuccesful
  }

  @Selector()
  public static notificationMessageState(state: FeedbackStateModel) {
    return state.notificationMsg
  }

  @Selector()
  public static exceptionInfo(state: FeedbackStateModel) {
    return state.exceptionInfo
  }

  @Selector()
  public static faulted(state: FeedbackStateModel) {
    return state.faulted
  }

  @Selector()
  public static feedbacks(state: FeedbackStateModel) {
    return state.feedbacks
  }

  @Selector()
  public static clientFeedBackTypes(state: FeedbackStateModel) {

    return state.feedbackTypes

  }

  @Selector()
  public static clientApps(state: FeedbackStateModel) {

    return state.clientApps

  }

  @Action(SaveFeedback)
  add(ctx: StateContext<FeedbackStateModel>, { payload }: SaveFeedback) {
    const state = ctx.getState()
    ctx.patchState({ loading: true })
    this.http.postObject(payload).subscribe( (feedback: Feedback) => {
      ctx.patchState({
        feedbacks: [...state.feedbacks, feedback],
        loading: false,
        actionSuccesful: true
      })
    },
      err => {
        this.showErrorMessage(ctx,err)
      })
  }

  @Action(ClearFeedbackTypeStates)
  ClearFeedbackTypeStates({ patchState }: StateContext<FeedbackStateModel>) {
    patchState({
      feedbackTypes: []
    })
  }


  @Action(HideNotification)
  hideNotifications({ patchState }: StateContext<FeedbackStateModel>) {

    patchState({ actionSuccesful: false, faulted: false })

  }

  @Action(SaveComment)
  saveComment(ctx: StateContext<FeedbackStateModel>, { payload }: SaveComment) {
    console.log('Saving comment: ', payload)
    ctx.patchState({ loading: true })
    this.http.postObjectWithUrlPostfix(payload,'feedback/comment').subscribe((feedback: Feedback) => {
      this.showSuccessMessage(ctx,"Comment saved")
      
    },
      err => {
        this.showErrorMessage(ctx,err)
      })
  }

  @Action(SaveFeedbackType)
  saveFeedbackType(ctx: StateContext<FeedbackStateModel>, { payload }: SaveFeedbackType) {
    const state = ctx.getState()
    ctx.patchState({ loading: true })
    this.http.postObjectWithUrlPostfix(payload, 'feedbacktype').subscribe((feedbackType: any) => {
        ctx.dispatch(new ListClientFeedbackTypes(ctx.getState().selectedClient.clientToken))
        this.showSuccessMessage(ctx, "Feedback type saved");
    },
      err => {
        this.showErrorMessage(ctx, err);
      })
  }

  @Action(RemoveFeedbackType)
  removeFeedbackType(ctx: StateContext<FeedbackStateModel>, { payload }: RemoveFeedbackType) {

    ctx.patchState({ loading: true })
    this.http.removeObjectWithUrlPostfix('feedbacktype', payload.clientFeedbackTypeId).subscribe((data) => {
      ctx.dispatch(new ListClientFeedbackTypes(ctx.getState().selectedClient.clientToken))
     this.showSuccessMessage(ctx,"Feedback type removed")
    },
      err => {
        this.showErrorMessage(ctx,err)
      })

  }


  @Action(SaveClientApp)
  saveClientApp(ctx: StateContext<FeedbackStateModel>, { payload }: SaveClientApp) {
    const state = ctx.getState()
    ctx.patchState({ loading: true })
    this.http.postObjectWithUrlPostfix(payload, 'client').subscribe((client: ClientApp) => {
      console.log('client :', client)
      
      this.showSuccessMessage(ctx, "Client app saved")
      ctx.dispatch(new ListAllClientApps());
    },
      err => {
        this.showErrorMessage(ctx, err)
      })
  }

  @Action(SaveFeedbackTypeSettingAction)
  saveFeedbackTypeSetting(ctx: StateContext<FeedbackStateModel>, { payload }: SaveFeedbackTypeSettingAction) {

    ctx.patchState({ loading: true })
    this.http.postObjectWithUrlPostfix(payload, 'settings').subscribe((setting: FeedbackTypeSetting) => {
    ctx.dispatch(new ListFeedbackTypeSettingsAction(setting.clientFeedbackTypeId.toString()))  
    this.showSuccessMessage(ctx, "Setting saved")
    }, err => {
      this.showErrorMessage(ctx, err)
    });
  }

  @Action(ListFeedbackTypeSettingsAction)
  listFeedbackTypeSettings(ctx: StateContext<FeedbackStateModel>, { payload }: ListFeedbackTypeSettingsAction) {

    const settingsUrlPostfix = 'settings/'+payload
    ctx.patchState({ loading: true })
    this.http.getObjectObservableWithUrlPostfix(settingsUrlPostfix)
    .subscribe(
      (sts: FeedbackTypeSetting[]) => {

        ctx.patchState({
          settings: sts,
          loading: false
        })

      }, err => {
        this.showErrorMessage(ctx,err)
      }
    )

  }
  

  @Action(RemoveClientApp)
  removeClientApp(ctx: StateContext<FeedbackStateModel>, { payload }: RemoveClientApp) {

    ctx.patchState({ loading: true })
    this.http.removeObjectWithUrlPostfix('client', payload).subscribe((data) => {
      console.log('Remove result: ', data);
      this.showSuccessMessage(ctx,"Client app removed")
      },
      err => {
        this.showErrorMessage(ctx, err)
      })

  }

  //TODO: Refactor this to another class ?
  @Action(ListAllClientApps)
  listAllClients({ patchState }: StateContext<FeedbackStateModel>)
  {
    patchState({ loading: true })

    const typesUrlPostfix = 'client'
    this.http.getObjectObservableWithUrlPostfix(typesUrlPostfix).subscribe((results: ClientApp[]) => {
      
      patchState({
        clientApps: results,
        loading: false
      })

    },
      err => {
        patchState({
          loading: false,
          exceptionInfo: err
        })
      })

  }


  @Action(ListAllFeedback)
  listAll({ patchState }: StateContext<FeedbackStateModel>) {

   
    patchState({ loading: true })
    this.http.getObjectsObservable().subscribe((resultFeedbacks: Feedback[]) => {
      console.log('Feedbacks', resultFeedbacks) 
      patchState({
        feedbacks: resultFeedbacks,
        loading: false
      })

    },
      err => {
          patchState({
            loading: false,
            faulted: true,
            exceptionInfo: err
          })
      })

  }

  @Action(ListFeedback)
  listWithQuery({ patchState }: StateContext<FeedbackStateModel>, { payload }: ListFeedback) {

    const typesUrlPostfix = 'feedback/query'
   
    patchState({ loading: true })
    this.http.postObjectWithUrlPostfix(payload, typesUrlPostfix).subscribe((receivedFeedbacks: Feedback[]) => {
      console.log('Received feedback:', receivedFeedbacks)
      patchState({
        feedbacks: receivedFeedbacks,
        loading: false
      })
    },
      err => {
        patchState({
          loading: false,
          faulted: true,
          exceptionInfo: err
        })
      })
  }


  @Action(ListClientFeedbackTypes)
  listClientFeedbacks({ patchState }: StateContext<FeedbackStateModel>, { payload }: ListClientFeedbackTypes) {

    patchState({ loading: true })
    const typesUrlPostfix = 'feedback/type/'+payload
    this.http.getObjectObservableWithUrlPostfix(typesUrlPostfix).subscribe((resultTypes: ClientFeedbackType[]) => {
      console.log('Feedback types: ', resultTypes)
      patchState({
        feedbackTypes: resultTypes,
        loading: false
      })
     
    },
      err => {
        patchState({
          loading: false,
          exceptionInfo: err
        })
      })

  }

  @Action(ClientSelectedAction)
  clientSelected({ patchState }: StateContext<FeedbackStateModel>, { payload }: ClientSelectedAction) {
    patchState({
      selectedClient: payload
    })
  }

  showSuccessMessage({ patchState }: StateContext<FeedbackStateModel>, message: string) {
    patchState({
      loading: false,
      actionSuccesful: true,
      notificationMsg: message
    })
    setTimeout(() => {
      patchState({
        actionSuccesful: false,
        notificationMsg: null
      })
    },3000)
  }

  showErrorMessage({ patchState }: StateContext<FeedbackStateModel>, message: string) {
    patchState({
      loading: false,
      faulted: true,
      exceptionInfo: message
    })
    setTimeout(() => {
      patchState({
        faulted: false,
        exceptionInfo: null
      })
    },3000)

  }

}
