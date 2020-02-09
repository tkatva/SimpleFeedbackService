
import { Observable } from 'rxjs/Observable';
import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/Rx';

@Injectable()
export class BaseHttpService {

  protected _url: string;

  protected urlPrefix: string;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(protected _http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this._url = baseUrl + 'api/';
  }


  protected handleError(error: Response) {
    console.log('Error received');
    console.log(error.json());
    return Observable.throw(error);
  }


  setApiUrlPostfix(postfix: string) {
    this.urlPrefix = this._url
    this._url = this._url + postfix

  }


  getObjects(url: string, mapFn: (response: Response) => any) {

    console.log('Calling GET on url : ', url);
    return this._http.get(url)
      .map(mapFn)
      .catch(this.handleError);

  }

  postObjectWithUrl(url: string, object: any, mapFn: (response: Response) => any) {


    const body = JSON.stringify(object);

    return this._http.post(url, body, this.httpOptions)
      .map(mapFn)
      .catch(this.handleError);

  }

  postObjectWithUrlPostfix(object: any, urlPostfix: string) {

    const url = this.urlPrefix + urlPostfix

    const body = JSON.stringify(object);
    return this._http.post(url, body, this.httpOptions);

  }

  postObject(object: any) {

    const body = JSON.stringify(object);
    return this._http.post(this._url, body, this.httpOptions);

  }

  getObjectsObservable() {
    return this._http.get(this._url);
  }

  getObjectObservableWithUrlPostfix(postfix: string) {

    const url = this.urlPrefix +  postfix

    return this._http.get(url);

  }

  saveObject(mapFn: (response: Response) => any, object: any) {


    const body = JSON.stringify(object);
    console.log('Saving object : ', object);
    if (object._id) {

      return this._http.put(this._url, body)
        .map(mapFn)
        .catch(this.handleError);

    } else {

      return this._http.post(this._url, body)
        .map(mapFn)
        .catch(this.handleError);

    }

  }

  removeObject(id: string, mapFn: (response: Response) => any) {

    const deleteUrl = this._url + id;

    return this._http.delete(deleteUrl)
      .map(mapFn)
      .catch(this.handleError);

  }

  removeObjectWithUrlPostfix(urlPostfix: string, id: number) {

    const deleteUrl = this.urlPrefix + urlPostfix + '/' + id

    return this._http.delete(deleteUrl)

  }

  removeObjectWithUrl(serviceUrl: string, id: string, mapFn: (response: Response) => any) {

    const deleteUrl = serviceUrl + '/' + id;
    return this._http.delete(deleteUrl)
      .map(mapFn)
      .catch(this.handleError);

  }

}
