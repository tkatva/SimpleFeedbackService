import { Component, OnInit } from '@angular/core';

import { Select, Store } from '@ngxs/store';

import { FeedbackState } from './../state/feedback.state'

import { ClientApp } from './../models/clientapp.model'

import { Observable } from 'rxjs';
import { ListAllClientApps, RemoveClientApp, SaveClientApp, HideNotification } from '../actions/feedback.action';



@Component({
  selector: 'clientapps',
  templateUrl: './clientapps.html'
})
export class ClientAppsComponent implements OnInit {

  @Select(FeedbackState.clientApps)
  clientApps$: Observable<ClientApp[]>

  @Select(FeedbackState.successState)
  isSuccess$: Observable<boolean>

  @Select(FeedbackState.faulted)
  faulted$: Observable<boolean>

  @Select(FeedbackState.notificationMessageState)
  notificationMsg$: Observable<string>

  showEdit: boolean = false

  selectedClientApp: ClientApp = <ClientApp>{}

  constructor(private store: Store) { }

  ngOnInit() {

    this.store.dispatch(new ListAllClientApps())

  }

  createNewClientApp() {

    this.showEdit = true

    this.selectedClientApp = <ClientApp>{}

  }

  cancel() {

    this.showEdit = false

    this.selectedClientApp = <ClientApp>{}

  }

  editClientApp(app: ClientApp) {

    this.selectedClientApp = app;
    this.showEdit = true

  }

  removeClientApp() {

    if (this.selectedClientApp.clientAppId !== undefined) {
      this.store.dispatch(new RemoveClientApp(this.selectedClientApp.clientAppId))
        .subscribe(x => {
          setTimeout(() => {
            console.log('X :', x)
            this.store.dispatch(new ListAllClientApps())
            this.store.dispatch(new HideNotification())
            this.cancel()
          }, 1000)
        })
      
    }

  }

  canSave() {
    return (this.selectedClientApp.clientName !== undefined && this.selectedClientApp.clientToken !== undefined)
  }

  saveClientApp() {

    if (this.selectedClientApp.clientName !== undefined && this.selectedClientApp !== undefined) {
      this.store.dispatch(new SaveClientApp(this.selectedClientApp));
      
    }

  }

}

