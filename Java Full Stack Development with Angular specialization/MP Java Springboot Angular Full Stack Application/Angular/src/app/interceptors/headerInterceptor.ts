
import { Injectable } from '@angular/core'
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {

  private AUTH_HEADER = "Authorization";

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

  return next.handle(this.addAuthenticationToken(req));

  }

  private addAuthenticationToken(request: HttpRequest<any>): HttpRequest<any> {

    // should add authorization token into headers except login and signup

    const token = localStorage.getItem('token');
    if(request.url.includes('signin') || request.url.includes('api/register')){
      return request;
    }
      request = request.clone({
        setHeaders: {
          authorization: `Bearer ${token}`
        }
      });
    return request;

  }

}

