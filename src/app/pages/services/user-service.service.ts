import { Injectable } from '@angular/core';
import { Headers, Http, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class UserServiceService {

  constructor( private http: Http) { }

  post(body): Observable<any> {
    return this.http.post(
      `http://192.168.52.11:4000/api/user/login`,
      JSON.stringify(body))
    .catch(res => {
      console.log('err');
      console.log(res);
      return Observable.throw(res.json());
    })
    .map((res: Response) => res.json());
  }

}
