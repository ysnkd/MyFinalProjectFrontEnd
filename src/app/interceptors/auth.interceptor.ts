import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let token = localStorage.getItem("token");
    //token yakalama
    let newRequest : HttpRequest<any>;
    //yapılan istekler
    newRequest = request.clone({
      headers:request.headers.set("Authorization","Bearer "+ token)
      //postmandaki header kısmı gibi.
    })
    //yapılan isteği klonla.
    return next.handle(newRequest);
  }
}
//bütün http isteklerimi intercept edecek kısımdır.
//servis bi hata verdiğinde napmalıyım ?
//diye kodlar yazabiliriz.
//request: tüm http isteklerimizdir.
//next:bekle pakede bişeyler eklicem.