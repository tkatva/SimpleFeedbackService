"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SaveFeedback = /** @class */ (function () {
    function SaveFeedback(payload) {
        this.payload = payload;
    }
    SaveFeedback.type = "[FEEDBACK] Save";
    return SaveFeedback;
}());
exports.SaveFeedback = SaveFeedback;
var RemoveFeedback = /** @class */ (function () {
    function RemoveFeedback(payload) {
        this.payload = payload;
    }
    RemoveFeedback.type = "[FEEDBACK] Remove";
    return RemoveFeedback;
}());
exports.RemoveFeedback = RemoveFeedback;
var ListFeedback = /** @class */ (function () {
    function ListFeedback(payload) {
        this.payload = payload;
    }
    ListFeedback.type = "[FEEDBACK] List";
    return ListFeedback;
}());
exports.ListFeedback = ListFeedback;
var ListAllFeedback = /** @class */ (function () {
    function ListAllFeedback() {
    }
    ListAllFeedback.type = "[FEEDBACK] List all";
    return ListAllFeedback;
}());
exports.ListAllFeedback = ListAllFeedback;
var ListClientFeedbackTypes = /** @class */ (function () {
    function ListClientFeedbackTypes(payload) {
        this.payload = payload;
    }
    ListClientFeedbackTypes.type = "[FEEDBACK] List feedback types";
    return ListClientFeedbackTypes;
}());
exports.ListClientFeedbackTypes = ListClientFeedbackTypes;
var ListAllClientApps = /** @class */ (function () {
    function ListAllClientApps() {
    }
    ListAllClientApps.type = "[ClientApp] List all";
    return ListAllClientApps;
}());
exports.ListAllClientApps = ListAllClientApps;
var SaveClientApp = /** @class */ (function () {
    function SaveClientApp(payload) {
        this.payload = payload;
    }
    SaveClientApp.type = "[ClientApp] Save";
    return SaveClientApp;
}());
exports.SaveClientApp = SaveClientApp;
var RemoveClientApp = /** @class */ (function () {
    function RemoveClientApp(payload) {
        this.payload = payload;
    }
    RemoveClientApp.type = "[ClientApp] remove";
    return RemoveClientApp;
}());
exports.RemoveClientApp = RemoveClientApp;
var SaveComment = /** @class */ (function () {
    function SaveComment(payload) {
        this.payload = payload;
    }
    SaveComment.type = "[FEEDBACK] Save comment";
    return SaveComment;
}());
exports.SaveComment = SaveComment;
var HideNotification = /** @class */ (function () {
    function HideNotification() {
    }
    HideNotification.type = "[FEEDBACK] Hide notification";
    return HideNotification;
}());
exports.HideNotification = HideNotification;
var ClearFeedbackTypeStates = /** @class */ (function () {
    function ClearFeedbackTypeStates() {
    }
    ClearFeedbackTypeStates.type = "[FEEDBACKTYPE] Clear";
    return ClearFeedbackTypeStates;
}());
exports.ClearFeedbackTypeStates = ClearFeedbackTypeStates;
var SaveFeedbackType = /** @class */ (function () {
    function SaveFeedbackType(payload) {
        this.payload = payload;
    }
    SaveFeedbackType.type = "[FEEDBACKTYPE] Save feedback type";
    return SaveFeedbackType;
}());
exports.SaveFeedbackType = SaveFeedbackType;
var RemoveFeedbackType = /** @class */ (function () {
    function RemoveFeedbackType(payload) {
        this.payload = payload;
    }
    RemoveFeedbackType.type = "[FEEDBACKTYPE] Remove feedback type";
    return RemoveFeedbackType;
}());
exports.RemoveFeedbackType = RemoveFeedbackType;
//# sourceMappingURL=feedback.action.js.map