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
var ClientAppsComponent = /** @class */ (function () {
    function ClientAppsComponent(store) {
        this.store = store;
        this.showEdit = false;
        this.selectedClientApp = {};
    }
    ClientAppsComponent.prototype.ngOnInit = function () {
        this.store.dispatch(new feedback_action_1.ListAllClientApps());
    };
    ClientAppsComponent.prototype.createNewClientApp = function () {
        this.showEdit = true;
        this.selectedClientApp = {};
    };
    ClientAppsComponent.prototype.cancel = function () {
        this.showEdit = false;
        this.selectedClientApp = {};
    };
    ClientAppsComponent.prototype.editClientApp = function (app) {
        this.selectedClientApp = app;
        this.showEdit = true;
    };
    ClientAppsComponent.prototype.removeClientApp = function () {
        var _this = this;
        if (this.selectedClientApp.clientAppId !== undefined) {
            this.store.dispatch(new feedback_action_1.RemoveClientApp(this.selectedClientApp.clientAppId))
                .subscribe(function (x) {
                setTimeout(function () {
                    console.log('X :', x);
                    _this.store.dispatch(new feedback_action_1.ListAllClientApps());
                    _this.store.dispatch(new feedback_action_1.HideNotification());
                    _this.cancel();
                }, 1000);
            });
        }
    };
    ClientAppsComponent.prototype.canSave = function () {
        return (this.selectedClientApp.clientName !== undefined && this.selectedClientApp.clientToken !== undefined);
    };
    ClientAppsComponent.prototype.saveClientApp = function () {
        if (this.selectedClientApp.clientName !== undefined && this.selectedClientApp !== undefined) {
            this.store.dispatch(new feedback_action_1.SaveClientApp(this.selectedClientApp));
        }
    };
    __decorate([
        store_1.Select(feedback_state_1.FeedbackState.clientApps)
    ], ClientAppsComponent.prototype, "clientApps$", void 0);
    __decorate([
        store_1.Select(feedback_state_1.FeedbackState.successState)
    ], ClientAppsComponent.prototype, "isSuccess$", void 0);
    __decorate([
        store_1.Select(feedback_state_1.FeedbackState.faulted)
    ], ClientAppsComponent.prototype, "faulted$", void 0);
    __decorate([
        store_1.Select(feedback_state_1.FeedbackState.notificationMessageState)
    ], ClientAppsComponent.prototype, "notificationMsg$", void 0);
    ClientAppsComponent = __decorate([
        core_1.Component({
            selector: 'clientapps',
            templateUrl: './clientapps.html'
        })
    ], ClientAppsComponent);
    return ClientAppsComponent;
}());
exports.ClientAppsComponent = ClientAppsComponent;
//# sourceMappingURL=clientapps.component.js.map