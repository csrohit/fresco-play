import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Contacts } from '../models/contacts';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  url = `http://www.mocky.io/v2/5c5d880f3200000e11220880`;
  constructor(
    private http: HttpClient
  ) { }

  getContacts(): Observable<Contacts> {
    // return this.http.get<Contacts>(this.url);
    // get contacts from the above url
    // return of(this.http.get<Contacts>(this.url));
    
    return this.http.get<Contacts>(this.url);
  }

}
