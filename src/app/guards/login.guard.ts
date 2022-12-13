import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(
    private authService:AuthService,
    private toastrService:ToastrService, // info
    private router:Router // yetkisiz girişlerde yönlendirme
  )
  {}
  canActivate( //aktifleşsin mi
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.authService.isAuthenticated())
    {
      return true; // token varsa
    }
    else
    {
      this.router.navigate(["login"])
      //yönlendir.
      this.toastrService.info("Sisteme Giriş yapmalısınız");
      return false; // token yoksa
    }
  }
  
}
//olası yetkisiz girişlerde guard'ı kullanırız.
//login'e yönlendirme