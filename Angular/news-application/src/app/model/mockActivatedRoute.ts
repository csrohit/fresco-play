import {Observable} from 'rxjs';
import {Type} from '@angular/core';
import {ActivatedRoute,Route,ActivatedRouteSnapshot,UrlSegment,Params,Data } from '@angular/router';

export class MockActivatedRoute {
  parent: any;
  params: any;
  snapshot = {};
  constructor(options:any) {
    this.parent = options.parent;
    this.params = options.params;
  }
}
