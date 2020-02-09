"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var Observable_1 = require("rxjs/Observable");
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
require("rxjs/Rx");
var BaseHttpService = /** @class */ (function () {
    function BaseHttpService(_http, baseUrl) {
        this._http = _http;
        this.httpOptions = {
            headers: new http_1.HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
        this._url = baseUrl + 'api/';
    }
    BaseHttpService.prototype.handleError = function (error) {
        console.log('Error received');
        console.log(error.json());
        return Observable_1.Observable.throw(error);
    };
    BaseHttpService.prototype.setApiUrlPostfix = function (postfix) {
        this.urlPrefix = this._url;
        this._url = this._url + postfix;
    };
    BaseHttpService.prototype.getObjects = function (url, mapFn) {
        console.log('Calling GET on url : ', url);
        return this._http.get(url)
            .map(mapFn)
            .catch(this.handleError);
    };
    BaseHttpService.prototype.postObjectWithUrl = function (url, object, mapFn) {
        var body = JSON.stringify(object);
        return this._http.post(url, body, this.httpOptions)
            .map(mapFn)
            .catch(this.handleError);
    };
    BaseHttpService.prototype.postObjectWithUrlPostfix = function (object, urlPostfix) {
        var url = this.urlPrefix + urlPostfix;
        var body = JSON.stringify(object);
        return this._http.post(url, body, this.httpOptions);
    };
    BaseHttpService.prototype.postObject = function (object) {
        var body = JSON.stringify(object);
        return this._http.post(this._url, body, this.httpOptions);
    };
    BaseHttpService.prototype.getObjectsObservable = function () {
        return this._http.get(this._url);
    };
    BaseHttpService.prototype.getObjectObservableWithUrlPostfix = function (postfix) {
        var url = this.urlPrefix + postfix;
        return this._http.get(url);
    };
    BaseHttpService.prototype.saveObject = function (mapFn, object) {
        var body = JSON.stringify(object);
        console.log('Saving object : ', object);
        if (object._id) {
            return this._http.put(this._url, body)
                .map(mapFn)
                .catch(this.handleError);
        }
        else {
            return this._http.post(this._url, body)
                .map(mapFn)
                .catch(this.handleError);
        }
    };
    BaseHttpService.prototype.removeObject = function (id, mapFn) {
        var deleteUrl = this._url + id;
        return this._http.delete(deleteUrl)
            .map(mapFn)
            .catch(this.handleError);
    };
    BaseHttpService.prototype.removeObjectWithUrlPostfix = function (urlPostfix, id) {
        var deleteUrl = this.urlPrefix + urlPostfix + '/' + id;
        return this._http.delete(deleteUrl);
    };
    BaseHttpService.prototype.removeObjectWithUrl = function (serviceUrl, id, mapFn) {
        var deleteUrl = serviceUrl + '/' + id;
        return this._http.delete(deleteUrl)
            .map(mapFn)
            .catch(this.handleError);
    };
    BaseHttpService = __decorate([
        core_1.Injectable(),
        __param(1, core_1.Inject('BASE_URL'))
    ], BaseHttpService);
    return BaseHttpService;
}());
exports.BaseHttpService = BaseHttpService;
//# sourceMappingURL=BaseHttpService.js.map