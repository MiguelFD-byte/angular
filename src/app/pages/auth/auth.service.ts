import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { UserResponse, User, estado } from '../../shared/components/models/user.interface';
import {catchError, map} from 'rxjs/operators';
import {JwtHelperService} from '@auth0/angular-jwt';
import { Router } from '@angular/router';


const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  private status = new BehaviorSubject<estado>('1');

  constructor(private http:HttpClient, private router:Router){
    this.checkToken();
  }

  get isLogged():Observable<boolean>{
    return this.loggedIn.asObservable();
  }
  
  get estado ():Observable<string>{
    return this.status.asObservable();
  }

  login(authdata: User): Observable<UserResponse | void>{
    return this.http.post<UserResponse>(`${environment.API_URL}/auth/login`, 
    authdata).pipe(
      map((res:UserResponse)  => {
        //token
        this.saveToken(res)
        this.loggedIn.next(true);
        return res;
      }),
      catchError((err) => this.handleError(err))
    );
  
  }
  
  logOut():void{
    localStorage.removeItem('user');
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }

  private checkToken(): void{
    const user = JSON.parse(localStorage.getItem('user')!);
    if(user){
      const Expired = helper.isTokenExpired(user.token);
    if(Expired){
      this.logOut();
    }else{
      this.loggedIn.next(true);
      this.status.next(user.status);
    }
  }
  
    //if(Expired){
     // this.logOut();
    //}else{
    //  this.loggedIn.next(true);
    //}
    //userlogged = expired
  }

  private saveToken(user:UserResponse): void{
    //localStorage.setItem('token', token);
    const {userID, message, ...rest} = user;
    localStorage.setItem('user', JSON.stringify(rest));
  }

  private handleError(err: { message: any; }):Observable<never>{

    let errorMessage = 'Error';
    if(err){
      errorMessage = `Error: code ${err.message}`;
    }
    return throwError(errorMessage);
  }  
}
