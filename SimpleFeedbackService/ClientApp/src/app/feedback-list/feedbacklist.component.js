"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var store_1 = require("@ngxs/store");
var feedback_state_1 = require("./../state/feedback.state");
var feedback_action_1 = require("./../actions/feedback.action");
var FeedbackListComponent = /** @class */ (function () {
    function FeedbackListComponent(store, route) {
        this.store = store;
        this.route = route;
        this.token = null;
        this.queryDto = {};
        this.showAlert = false;
        this.showComment = false;
        this.alertText = null;
        this.selectedFeedback = {};
        this.modalOpened = false;
    }
    FeedbackListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.token = params['token'];
            if (!_this.token) {
                _this.showAlertPopup('No client token given! Feedback list will not work');
            }
            else {
                _this.store.dispatch(new feedback_action_1.ListClientFeedbackTypes(_this.token));
            }
        });
        this.store.dispatch(new feedback_action_1.ListAllClientApps());
    };
    FeedbackListComponent.prototype.onClientChange = function (event) {
        console.log('Event: ', event);
        this.store.dispatch(new feedback_action_1.ListClientFeedbackTypes(event));
    };
    FeedbackListComponent.prototype.onClose = function (reason) {
        console.log("Alert closed by " + reason);
        this.showAlert = false;
    };
    FeedbackListComponent.prototype.doSearch = function () {
        this.store.dispatch(new feedback_action_1.ListFeedback(this.queryDto));
    };
    FeedbackListComponent.prototype.showAlertPopup = function (message) {
        this.showAlert = true;
        this.alertText = message;
    };
    FeedbackListComponent.prototype.onRowClick = function (event) {
        this.selectedFeedback = event;
        this.showComment = true;
        window.scroll(0, 0);
    };
    FeedbackListComponent.prototype.cancel = function () {
        this.showComment = false;
    };
    FeedbackListComponent.prototype.saveComment = function () {
        var _this = this;
        var saveCommentDto = {
            feedbackId: this.selectedFeedback.feedbackId,
            comment: this.selectedFeedback.comment,
            handled: this.selectedFeedback.feedbackProcessed
        };
        this.store.dispatch(new feedback_action_1.SaveComment(saveCommentDto)).subscribe(function (x) { return _this.store.dispatch(new feedback_action_1.ListFeedback(_this.queryDto)); });
        this.showComment = false;
        setTimeout(function () { return _this.store.dispatch(new feedback_action_1.HideNotification()); }, 5000);
    };
    __decorate([
        store_1.Select(feedback_state_1.FeedbackState.clientFeedBackTypes)
    ], FeedbackListComponent.prototype, "feedBackTypes$", void 0);
    __decorate([
        store_1.Select(feedback_state_1.FeedbackState.clientApps)
    ], FeedbackListComponent.prototype, "clientApps$", void 0);
    __decorate([
        store_1.Select(feedback_state_1.FeedbackState.feedbacks)
    ], FeedbackListComponent.prototype, "feedbacks$", void 0);
    __decorate([
        store_1.Select(feedback_state_1.FeedbackState.successState)
    ], FeedbackListComponent.prototype, "isSuccess$", void 0);
    __decorate([
        store_1.Select(feedback_state_1.FeedbackState.faulted)
    ], FeedbackListComponent.prototype, "faulted$", void 0);
    FeedbackListComponent = __decorate([
        core_1.Component({
            selector: 'feedback-list',
            templateUrl: './feedbacklist.html'
        })
    ], FeedbackListComponent);
    return FeedbackListComponent;
}());
exports.FeedbackListComponent = FeedbackListComponent;
//# sourceMappingURL=feedbacklist.component.js.map