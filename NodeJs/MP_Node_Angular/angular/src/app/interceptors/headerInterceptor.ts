
import { Injectable } from '@angular/core'
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {

  private AUTH_HEADER = "authorization";

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

  return;

  }

  private addAuthenticationToken(request: HttpRequest<any>): HttpRequest<any> {

    // should add authorization token into headers except login and signup

    return;
    
  }

}

