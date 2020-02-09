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
var FeedformComponent = /** @class */ (function () {
    function FeedformComponent(store, route) {
        this.store = store;
        this.route = route;
        this.editedFeedback = {};
        this.token = null;
        this.showAlert = false;
        this.alertText = null;
    }
    FeedformComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.token = params['token'];
            if (!_this.token) {
                _this.showAlertPopup('No client token given! Feedback form will not work');
            }
            else {
                _this.editedFeedback.clientToken = _this.token;
                _this.store.dispatch(new feedback_action_1.ListClientFeedbackTypes(_this.token));
            }
        });
    };
    FeedformComponent.prototype.saveFeedback = function () {
        var _this = this;
        this.store.dispatch(new feedback_action_1.SaveFeedback(this.editedFeedback));
        setTimeout(function () { return _this.store.dispatch(new feedback_action_1.HideNotification()); }, 5000);
    };
    FeedformComponent.prototype.onClose = function (reason) {
        console.log("Alert closed by " + reason);
        this.showAlert = false;
    };
    FeedformComponent.prototype.showAlertPopup = function (message) {
        this.showAlert = true;
        this.alertText = message;
    };
    __decorate([
        store_1.Select(feedback_state_1.FeedbackState.loading)
    ], FeedformComponent.prototype, "loading$", void 0);
    __decorate([
        store_1.Select(feedback_state_1.FeedbackState.clientFeedBackTypes)
    ], FeedformComponent.prototype, "feedBackTypes$", void 0);
    __decorate([
        store_1.Select(feedback_state_1.FeedbackState.feedbacks)
    ], FeedformComponent.prototype, "feedbacks$", void 0);
    __decorate([
        store_1.Select(feedback_state_1.FeedbackState.successState)
    ], FeedformComponent.prototype, "isSuccess$", void 0);
    __decorate([
        store_1.Select(feedback_state_1.FeedbackState.faulted)
    ], FeedformComponent.prototype, "faulted$", void 0);
    FeedformComponent = __decorate([
        core_1.Component({
            selector: 'feedback-form',
            templateUrl: './feedbackform.html'
        })
    ], FeedformComponent);
    return FeedformComponent;
}());
exports.FeedformComponent = FeedformComponent;
//# sourceMappingURL=feedbackform.component.js.map