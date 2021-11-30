
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { DataService } from './data.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(public dataService: DataService, public router: Router) { }

  canActivate() {
    this.router.navigate(['login']);
    return true;
    // return true if authenticated else redirect to login page
    // return this.dataService
    // .getAuthStatus()
    // .pipe(
    //   catchError(err => {
    //     console.log(err)
    //     return of(false);
    //   }),
    //   tap(res => {
    //     if(!res){
    //       console.log('Navigating to login');
    //       this.router.navigate(['login']);
    //     }
    //   })
    // )
  }

}

