
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { DataService } from './data.service';

@Injectable()
export class AuthGuardService implements CanActivate {

    constructor(public dataService: DataService, public router: Router) { }

    canActivate(): boolean {
        // return true if authenticated else redirect to login page
        const id = localStorage.getItem('userId');
        if (id) {
            return true;
        }
        this.router.navigate(['/login']);
        return false;
    }

}

