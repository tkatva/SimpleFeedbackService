"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var store_1 = require("@ngxs/store");
var feedback_action_1 = require("./../actions/feedback.action");
var FeedbackStateModel = /** @class */ (function () {
    function FeedbackStateModel() {
    }
    return FeedbackStateModel;
}());
exports.FeedbackStateModel = FeedbackStateModel;
var FeedbackState = /** @class */ (function () {
    function FeedbackState(http) {
        this.http = http;
        http.setApiUrlPostfix('feedback');
    }
    FeedbackState.loading = function (state) {
        return state.loading;
    };
    FeedbackState.successState = function (state) {
        return state.actionSuccesful;
    };
    FeedbackState.notificationMessageState = function (state) {
        return state.notificationMsg;
    };
    FeedbackState.exceptionInfo = function (state) {
        return state.exceptionInfo;
    };
    FeedbackState.faulted = function (state) {
        return state.faulted;
    };
    FeedbackState.feedbacks = function (state) {
        return state.feedbacks;
    };
    FeedbackState.clientFeedBackTypes = function (state) {
        return state.feedbackTypes;
    };
    FeedbackState.clientApps = function (state) {
        return state.clientApps;
    };
    FeedbackState.prototype.add = function (ctx, _a) {
        var _this = this;
        var payload = _a.payload;
        var state = ctx.getState();
        ctx.patchState({ loading: true });
        this.http.postObject(payload).subscribe(function (feedback) {
            ctx.patchState({
                feedbacks: __spreadArrays(state.feedbacks, [feedback]),
                loading: false,
                actionSuccesful: true
            });
        }, function (err) {
            _this.showErrorMessage(ctx, err);
        });
    };
    FeedbackState.prototype.ClearFeedbackTypeStates = function (_a) {
        var patchState = _a.patchState;
        patchState({
            feedbackTypes: []
        });
    };
    FeedbackState.prototype.hideNotifications = function (_a) {
        var patchState = _a.patchState;
        patchState({ actionSuccesful: false, faulted: false });
    };
    FeedbackState.prototype.saveComment = function (ctx, _a) {
        var _this = this;
        var payload = _a.payload;
        console.log('Saving comment: ', payload);
        ctx.patchState({ loading: true });
        this.http.postObjectWithUrlPostfix(payload, 'feedback/comment').subscribe(function (feedback) {
            _this.showSuccessMessage(ctx, "Comment saved");
        }, function (err) {
            _this.showErrorMessage(ctx, err);
        });
    };
    FeedbackState.prototype.saveFeedbackType = function (ctx, _a) {
        var _this = this;
        var payload = _a.payload;
        var state = ctx.getState();
        ctx.patchState({ loading: true });
        this.http.postObjectWithUrlPostfix(payload, 'feedbacktype').subscribe(function (feedbackType) {
            ctx.dispatch(new feedback_action_1.ListClientFeedbackTypes(ctx.getState().selectedClient.clientToken));
            _this.showSuccessMessage(ctx, "Feedback type saved");
        }, function (err) {
            _this.showErrorMessage(ctx, err);
        });
    };
    FeedbackState.prototype.removeFeedbackType = function (ctx, _a) {
        var _this = this;
        var payload = _a.payload;
        ctx.patchState({ loading: true });
        this.http.removeObjectWithUrlPostfix('feedbacktype', payload.clientFeedbackTypeId).subscribe(function (data) {
            ctx.dispatch(new feedback_action_1.ListClientFeedbackTypes(ctx.getState().selectedClient.clientToken));
            _this.showSuccessMessage(ctx, "Feedback type removed");
        }, function (err) {
            _this.showErrorMessage(ctx, err);
        });
    };
    FeedbackState.prototype.saveClientApp = function (ctx, _a) {
        var _this = this;
        var payload = _a.payload;
        var state = ctx.getState();
        ctx.patchState({ loading: true });
        this.http.postObjectWithUrlPostfix(payload, 'client').subscribe(function (client) {
            console.log('client :', client);
            _this.showSuccessMessage(ctx, "Client app saved");
            ctx.dispatch(new feedback_action_1.ListAllClientApps());
        }, function (err) {
            _this.showErrorMessage(ctx, err);
        });
    };
    FeedbackState.prototype.saveFeedbackTypeSetting = function (ctx, _a) {
        var _this = this;
        var payload = _a.payload;
        ctx.patchState({ loading: true });
        this.http.postObjectWithUrlPostfix(payload, 'settings').subscribe(function (setting) {
            ctx.dispatch(new feedback_action_1.ListFeedbackTypeSettingsAction(setting.clientFeedbackTypeId.toString()));
            _this.showSuccessMessage(ctx, "Setting saved");
        }, function (err) {
            _this.showErrorMessage(ctx, err);
        });
    };
    FeedbackState.prototype.listFeedbackTypeSettings = function (ctx, _a) {
        var _this = this;
        var payload = _a.payload;
        var settingsUrlPostfix = 'settings/' + payload;
        ctx.patchState({ loading: true });
        this.http.getObjectObservableWithUrlPostfix(settingsUrlPostfix)
            .subscribe(function (sts) {
            ctx.patchState({
                settings: sts,
                loading: false
            });
        }, function (err) {
            _this.showErrorMessage(ctx, err);
        });
    };
    FeedbackState.prototype.removeClientApp = function (ctx, _a) {
        var _this = this;
        var payload = _a.payload;
        ctx.patchState({ loading: true });
        this.http.removeObjectWithUrlPostfix('client', payload).subscribe(function (data) {
            console.log('Remove result: ', data);
            _this.showSuccessMessage(ctx, "Client app removed");
        }, function (err) {
            _this.showErrorMessage(ctx, err);
        });
    };
    //TODO: Refactor this to another class ?
    FeedbackState.prototype.listAllClients = function (_a) {
        var patchState = _a.patchState;
        patchState({ loading: true });
        var typesUrlPostfix = 'client';
        this.http.getObjectObservableWithUrlPostfix(typesUrlPostfix).subscribe(function (results) {
            patchState({
                clientApps: results,
                loading: false
            });
        }, function (err) {
            patchState({
                loading: false,
                exceptionInfo: err
            });
        });
    };
    FeedbackState.prototype.listAll = function (_a) {
        var patchState = _a.patchState;
        patchState({ loading: true });
        this.http.getObjectsObservable().subscribe(function (resultFeedbacks) {
            console.log('Feedbacks', resultFeedbacks);
            patchState({
                feedbacks: resultFeedbacks,
                loading: false
            });
        }, function (err) {
            patchState({
                loading: false,
                faulted: true,
                exceptionInfo: err
            });
        });
    };
    FeedbackState.prototype.listWithQuery = function (_a, _b) {
        var patchState = _a.patchState;
        var payload = _b.payload;
        var typesUrlPostfix = 'feedback/query';
        patchState({ loading: true });
        this.http.postObjectWithUrlPostfix(payload, typesUrlPostfix).subscribe(function (receivedFeedbacks) {
            console.log('Received feedback:', receivedFeedbacks);
            patchState({
                feedbacks: receivedFeedbacks,
                loading: false
            });
        }, function (err) {
            patchState({
                loading: false,
                faulted: true,
                exceptionInfo: err
            });
        });
    };
    FeedbackState.prototype.listClientFeedbacks = function (_a, _b) {
        var patchState = _a.patchState;
        var payload = _b.payload;
        patchState({ loading: true });
        var typesUrlPostfix = 'feedback/type/' + payload;
        this.http.getObjectObservableWithUrlPostfix(typesUrlPostfix).subscribe(function (resultTypes) {
            console.log('Feedback types: ', resultTypes);
            patchState({
                feedbackTypes: resultTypes,
                loading: false
            });
        }, function (err) {
            patchState({
                loading: false,
                exceptionInfo: err
            });
        });
    };
    FeedbackState.prototype.clientSelected = function (_a, _b) {
        var patchState = _a.patchState;
        var payload = _b.payload;
        patchState({
            selectedClient: payload
        });
    };
    FeedbackState.prototype.showSuccessMessage = function (_a, message) {
        var patchState = _a.patchState;
        patchState({
            loading: false,
            actionSuccesful: true,
            notificationMsg: message
        });
        setTimeout(function () {
            patchState({
                actionSuccesful: false,
                notificationMsg: null
            });
        }, 3000);
    };
    FeedbackState.prototype.showErrorMessage = function (_a, message) {
        var patchState = _a.patchState;
        patchState({
            loading: false,
            faulted: true,
            exceptionInfo: message
        });
        setTimeout(function () {
            patchState({
                faulted: false,
                exceptionInfo: null
            });
        }, 3000);
    };
    __decorate([
        store_1.Action(feedback_action_1.SaveFeedback)
    ], FeedbackState.prototype, "add", null);
    __decorate([
        store_1.Action(feedback_action_1.ClearFeedbackTypeStates)
    ], FeedbackState.prototype, "ClearFeedbackTypeStates", null);
    __decorate([
        store_1.Action(feedback_action_1.HideNotification)
    ], FeedbackState.prototype, "hideNotifications", null);
    __decorate([
        store_1.Action(feedback_action_1.SaveComment)
    ], FeedbackState.prototype, "saveComment", null);
    __decorate([
        store_1.Action(feedback_action_1.SaveFeedbackType)
    ], FeedbackState.prototype, "saveFeedbackType", null);
    __decorate([
        store_1.Action(feedback_action_1.RemoveFeedbackType)
    ], FeedbackState.prototype, "removeFeedbackType", null);
    __decorate([
        store_1.Action(feedback_action_1.SaveClientApp)
    ], FeedbackState.prototype, "saveClientApp", null);
    __decorate([
        store_1.Action(feedback_action_1.SaveFeedbackTypeSettingAction)
    ], FeedbackState.prototype, "saveFeedbackTypeSetting", null);
    __decorate([
        store_1.Action(feedback_action_1.ListFeedbackTypeSettingsAction)
    ], FeedbackState.prototype, "listFeedbackTypeSettings", null);
    __decorate([
        store_1.Action(feedback_action_1.RemoveClientApp)
    ], FeedbackState.prototype, "removeClientApp", null);
    __decorate([
        store_1.Action(feedback_action_1.ListAllClientApps)
    ], FeedbackState.prototype, "listAllClients", null);
    __decorate([
        store_1.Action(feedback_action_1.ListAllFeedback)
    ], FeedbackState.prototype, "listAll", null);
    __decorate([
        store_1.Action(feedback_action_1.ListFeedback)
    ], FeedbackState.prototype, "listWithQuery", null);
    __decorate([
        store_1.Action(feedback_action_1.ListClientFeedbackTypes)
    ], FeedbackState.prototype, "listClientFeedbacks", null);
    __decorate([
        store_1.Action(feedback_action_1.ClientSelectedAction)
    ], FeedbackState.prototype, "clientSelected", null);
    __decorate([
        store_1.Selector()
    ], FeedbackState, "loading", null);
    __decorate([
        store_1.Selector()
    ], FeedbackState, "successState", null);
    __decorate([
        store_1.Selector()
    ], FeedbackState, "notificationMessageState", null);
    __decorate([
        store_1.Selector()
    ], FeedbackState, "exceptionInfo", null);
    __decorate([
        store_1.Selector()
    ], FeedbackState, "faulted", null);
    __decorate([
        store_1.Selector()
    ], FeedbackState, "feedbacks", null);
    __decorate([
        store_1.Selector()
    ], FeedbackState, "clientFeedBackTypes", null);
    __decorate([
        store_1.Selector()
    ], FeedbackState, "clientApps", null);
    FeedbackState = __decorate([
        store_1.State({
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
                notificationMsg: null,
                selectedClient: null,
                selectedFeedBackType: null
            }
        })
    ], FeedbackState);
    return FeedbackState;
}());
exports.FeedbackState = FeedbackState;
//# sourceMappingURL=feedback.state.js.map