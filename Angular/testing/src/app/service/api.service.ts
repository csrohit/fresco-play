import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { catchError, map, tap } from 'rxjs/operators';
import { Member } from '../models/member';

@Injectable({ providedIn: 'root' })
export class ApiService {

  base_url: string;
  item: BehaviorSubject<object>;
  isEdit: BehaviorSubject<boolean>;

  constructor(private http: HttpClient) {
    this.base_url = 'api';
    this.item = new BehaviorSubject<object>({});
    this.isEdit = new BehaviorSubject<boolean>(false);
  }

  getMembers(): Observable<Member[]> {
    const postURL = '/memberList';
    return this.http.get<Member[]>(this.base_url + postURL)
      .map(response => response)
      .catch(this.handleError);
  }

  addMember(member: Member): Observable<any> {
    const postURL = '/memberList';
    return this.http.post(this.base_url + postURL, member)
      .map(response => response)
      .catch(this.handleError);
  }

  updateMember(member: Member): Observable<any> {
    const postURL = '/memberList/';
    return this.http.put(this.base_url + postURL + member.id, member)
      .map(response => response)
      .catch(this.handleError);
  }

  deleteMember(id): Observable<any> {
    const postURL = '/memberList/';
    return this.http.delete(this.base_url + postURL + id)
      .map(response => response)
      .catch(this.handleError);
  }

  setFormValue(value) {
    this.item.next(value);
    this.isEdit.next(true);
  }

  clearFormValue() {
    this.item.next({});
    this.isEdit.next(false);
  }

  getFormValue(): Observable<any> {
    return this.item;
  }

  getFormStatus(): Observable<any> {
    return this.isEdit;
  }

  private handleError(error: Response | any) {
    console.error('ApiService::handleError', error);
    return Observable.throw(error);
  }

}
