import { Component, OnInit } from '@angular/core';

import { Select, Store } from '@ngxs/store';

import { FeedbackState } from './../state/feedback.state'

import { Observable } from 'rxjs';

import { ClientApp } from './../models/clientapp.model'

import { ClientFeedbackType } from './../models/clientfeedbacktype.model'

import { ListAllClientApps, RemoveFeedbackType, SaveFeedbackType, ListClientFeedbackTypes, HideNotification, ClearFeedbackTypeStates, ClientSelectedAction } from '../actions/feedback.action';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'feedbacktypes',
  templateUrl: './feedbacktypes.html'
})
export class FeedbackTypesComponent implements OnInit {

  @Select(FeedbackState.clientApps)
  clientApps$: Observable<ClientApp[]>

  @Select(FeedbackState.clientFeedBackTypes)
  clientFeedbackTypes$: Observable<ClientFeedbackType[]>

  @Select(FeedbackState.successState)
  isSuccess$: Observable<boolean>

  @Select(FeedbackState.faulted)
  faulted$: Observable<boolean>

  @Select(FeedbackState.notificationMessageState)
  notificationMsg$: Observable<string>

  showEdit: boolean = false

  selectedFeedbackType: ClientFeedbackType = <ClientFeedbackType>{}

  selectedClient?: ClientApp

  constructor(private store: Store, private router: Router) {
    this.router.events.filter(x => x instanceof NavigationEnd)
      .subscribe(y => this.store.dispatch(new ClearFeedbackTypeStates()))
  }

  ngOnInit() {

    this.store.dispatch(new ListAllClientApps())

  }

  doSearch() {

    if (this.selectedClient) {
      this.store.dispatch(new ListClientFeedbackTypes(this.selectedClient.clientToken))
    }

  }

  editFeedbacktype(type: ClientFeedbackType) {
    this.selectedFeedbackType = type
    this.showEdit = true
  }

  newFeedbackType() {

    this.selectedFeedbackType = <ClientFeedbackType>{}
    this.showEdit = true
    
  }

  clientAppChanged() {
    
    if (this.selectedClient) {
      this.store.dispatch(new ClientSelectedAction(this.selectedClient))
    }

  }  

  cancelEdit() {

    this.selectedFeedbackType = <ClientFeedbackType>{}
    this.showEdit = false

  }

  saveFeedback() {
    if (this.selectedClient) {
      this.selectedFeedbackType.clientAppId = this.selectedClient.clientAppId
      this.store.dispatch(new SaveFeedbackType(this.selectedFeedbackType))
        .subscribe(x => {
         
          this.cancelEdit()
          if (this.selectedClient) {
            this.store.dispatch(new ListClientFeedbackTypes(this.selectedClient.clientToken))
          }
        })
    }
  

  }

  removeFeedback() {

    this.store.dispatch(new RemoveFeedbackType(this.selectedFeedbackType))
      .subscribe(x => {
        this.cancelEdit()
       
      })

  }
  

}
