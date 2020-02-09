  
import { Observable } from 'rxjs/Observable';

import { Component, OnInit } from '@angular/core';

import { Select, Store } from '@ngxs/store';

import { FeedbackState } from './../state/feedback.state'

import { Feedback } from './../models/feedback.model'

import { ClientFeedbackType, ClientApp } from './../models/clientfeedbacktype.model'

import { INglDatatableSort, INglDatatableRowClick } from 'ng-lightning';

import { CommentSaveDTO } from './../models/feedback.query.dto'

import { ListAllClientApps, ListClientFeedbackTypes, ListFeedback, SaveComment, HideNotification } from './../actions/feedback.action'

import { ActivatedRoute, Event } from '@angular/router'



@Component({
  selector: 'feedback-list',
  templateUrl: './feedbacklist.html'
})
export class FeedbackListComponent implements OnInit {



  @Select(FeedbackState.clientFeedBackTypes)
  feedBackTypes$: Observable<ClientFeedbackType[]>

  @Select(FeedbackState.clientApps)
  clientApps$: Observable<ClientApp[]>

  @Select(FeedbackState.feedbacks)
  feedbacks$: Observable<Feedback[]>

  @Select(FeedbackState.successState)
  isSuccess$: Observable<boolean>

  @Select(FeedbackState.faulted)
  faulted$: Observable<boolean>


  token: string = null

  queryDto = {}

  showAlert: boolean = false

  showComment: boolean = false

  selectedClientApp: any

  alertText: string = null

  selectedFeedback: Feedback = {} as Feedback

  modalOpened = false

  constructor(private store: Store, private route: ActivatedRoute) { }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.token = params['token']
      if (!this.token) {
        this.showAlertPopup('No client token given! Feedback list will not work');
      } else {
        
        this.store.dispatch(new ListClientFeedbackTypes(this.token))
        

      }

    });
    this.store.dispatch(new ListAllClientApps())
    

  }

  onClientChange(event) {

    console.log('Event: ', event)

    this.store.dispatch(new ListClientFeedbackTypes(event))

  }

  onClose(reason: string) {
    console.log(`Alert closed by ${reason}`);
    this.showAlert = false;
  }

  doSearch() {

    this.store.dispatch(new ListFeedback(this.queryDto))

  }

  showAlertPopup(message: string) {
    this.showAlert = true
    this.alertText = message
  }

  onRowClick(event: Feedback) {

    this.selectedFeedback = event
    this.showComment = true
    window.scroll(0, 0);
  }

  cancel() {
    this.showComment = false
  }

  saveComment() {

    const saveCommentDto = <CommentSaveDTO>{
      feedbackId: this.selectedFeedback.feedbackId,
      comment: this.selectedFeedback.comment,
      handled: this.selectedFeedback.feedbackProcessed
    }
    this.store.dispatch(new SaveComment(saveCommentDto)).subscribe(x => this.store.dispatch(new ListFeedback(this.queryDto)))
    
    this.showComment = false
    setTimeout(() => this.store.dispatch(new HideNotification()), 5000)
  }

}
