
import { Observable } from 'rxjs/Observable';

import { Component, OnInit } from '@angular/core';

import { Select, Store } from '@ngxs/store';

import { FeedbackState } from './../state/feedback.state'

import { Feedback } from './../models/feedback.model'

import { ClientFeedbackType } from './../models/clientfeedbacktype.model'

import { SaveFeedback, ListClientFeedbackTypes, ListAllFeedback, HideNotification } from './../actions/feedback.action'

import { ActivatedRoute } from '@angular/router'


@Component({
  selector: 'feedback-form',
  templateUrl: './feedbackform.html'
})
export class FeedformComponent implements OnInit {


  @Select(FeedbackState.loading)
  loading$: Observable<boolean>

  @Select(FeedbackState.clientFeedBackTypes)
  feedBackTypes$: Observable<ClientFeedbackType[]>

  @Select(FeedbackState.feedbacks)
  feedbacks$: Observable<Feedback[]>

  @Select(FeedbackState.successState)
  isSuccess$: Observable<boolean>

  @Select(FeedbackState.faulted)
  faulted$: Observable<boolean>

  editedFeedback: Feedback = <Feedback>{}

  token: string = null

  showAlert: boolean = false

  alertText: string = null

  constructor(private store: Store, private route: ActivatedRoute) { }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.token = params['token']
      if (!this.token) {
        this.showAlertPopup('No client token given! Feedback form will not work');
      } else {
        this.editedFeedback.clientToken = this.token
        this.store.dispatch(new ListClientFeedbackTypes(this.token))
        
       
      }
     
    });

  }

  saveFeedback() {

    this.store.dispatch(new SaveFeedback(this.editedFeedback))
    setTimeout(() => this.store.dispatch(new HideNotification()), 5000)
  }

  onClose(reason: string) {
    console.log(`Alert closed by ${reason}`);
    this.showAlert = false;
  }

  showAlertPopup(message: string) {
    this.showAlert = true
    this.alertText = message
  }
}
