import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from '../../pages/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CheckLoginGuard implements CanActivate {


  constructor(private auth:AuthService){}


    canActivate():Observable<boolean>{
      return this.auth.isLogged.pipe(
        take(1),
        map((isLogged: boolean) => !isLogged)
      );

    }
}
