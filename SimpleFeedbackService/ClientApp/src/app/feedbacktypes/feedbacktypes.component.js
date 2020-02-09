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
var feedback_action_1 = require("../actions/feedback.action");
var router_1 = require("@angular/router");
var FeedbackTypesComponent = /** @class */ (function () {
    function FeedbackTypesComponent(store, router) {
        var _this = this;
        this.store = store;
        this.router = router;
        this.showEdit = false;
        this.selectedFeedbackType = {};
        this.router.events.filter(function (x) { return x instanceof router_1.NavigationEnd; })
            .subscribe(function (y) { return _this.store.dispatch(new feedback_action_1.ClearFeedbackTypeStates()); });
    }
    FeedbackTypesComponent.prototype.ngOnInit = function () {
        this.store.dispatch(new feedback_action_1.ListAllClientApps());
    };
    FeedbackTypesComponent.prototype.doSearch = function () {
        if (this.selectedClient) {
            this.store.dispatch(new feedback_action_1.ListClientFeedbackTypes(this.selectedClient.clientToken));
        }
    };
    FeedbackTypesComponent.prototype.editFeedbacktype = function (type) {
        this.selectedFeedbackType = type;
        this.showEdit = true;
    };
    FeedbackTypesComponent.prototype.newFeedbackType = function () {
        this.selectedFeedbackType = {};
        this.showEdit = true;
    };
    FeedbackTypesComponent.prototype.clientAppChanged = function () {
        if (this.selectedClient) {
            this.store.dispatch(new feedback_action_1.ClientSelectedAction(this.selectedClient));
        }
    };
    FeedbackTypesComponent.prototype.cancelEdit = function () {
        this.selectedFeedbackType = {};
        this.showEdit = false;
    };
    FeedbackTypesComponent.prototype.saveFeedback = function () {
        var _this = this;
        if (this.selectedClient) {
            this.selectedFeedbackType.clientAppId = this.selectedClient.clientAppId;
            this.store.dispatch(new feedback_action_1.SaveFeedbackType(this.selectedFeedbackType))
                .subscribe(function (x) {
                _this.cancelEdit();
                if (_this.selectedClient) {
                    _this.store.dispatch(new feedback_action_1.ListClientFeedbackTypes(_this.selectedClient.clientToken));
                }
            });
        }
    };
    FeedbackTypesComponent.prototype.removeFeedback = function () {
        var _this = this;
        this.store.dispatch(new feedback_action_1.RemoveFeedbackType(this.selectedFeedbackType))
            .subscribe(function (x) {
            _this.cancelEdit();
        });
    };
    __decorate([
        store_1.Select(feedback_state_1.FeedbackState.clientApps)
    ], FeedbackTypesComponent.prototype, "clientApps$", void 0);
    __decorate([
        store_1.Select(feedback_state_1.FeedbackState.clientFeedBackTypes)
    ], FeedbackTypesComponent.prototype, "clientFeedbackTypes$", void 0);
    __decorate([
        store_1.Select(feedback_state_1.FeedbackState.successState)
    ], FeedbackTypesComponent.prototype, "isSuccess$", void 0);
    __decorate([
        store_1.Select(feedback_state_1.FeedbackState.faulted)
    ], FeedbackTypesComponent.prototype, "faulted$", void 0);
    __decorate([
        store_1.Select(feedback_state_1.FeedbackState.notificationMessageState)
    ], FeedbackTypesComponent.prototype, "notificationMsg$", void 0);
    FeedbackTypesComponent = __decorate([
        core_1.Component({
            selector: 'feedbacktypes',
            templateUrl: './feedbacktypes.html'
        })
    ], FeedbackTypesComponent);
    return FeedbackTypesComponent;
}());
exports.FeedbackTypesComponent = FeedbackTypesComponent;
//# sourceMappingURL=feedbacktypes.component.js.map