import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import {FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy{
  private suscriptions: Subscription = new Subscription;
    hide = true;

    loginForm:any = this.fb.group({
    userID:['', [Validators.required,
      Validators.minLength(5)]],
    userPassword:['', [Validators.required,
    Validators.minLength(5)]],
  });

  constructor(private authService:AuthService, private fb:FormBuilder
  ,private router:Router){}

  ngOnDestroy(): void{
    this.suscriptions.unsubscribe();
  }


  ngOnInit(): void {}

  onLogin(): void{
    if(this.loginForm.invalid){
      return;
    }
    const formValue= this.loginForm.value;
    this.suscriptions.add(
    this.authService.login(formValue).subscribe(res => {
      if(res){
        this.router.navigate(['']);
      }
    })
    );
  }

  getError(field:string){
    let message;
    if(this.loginForm.get(field).errors.required){
      message = 'Ingrese algun valor';
    }else if(this.loginForm.get(field)?.hasError('minlength')){
      const minl = this.loginForm.get(field).errors?.minlength.requiredLength;
      message = `Caracteres minimos son ${minl}`;
    }
    return message;
  }


  isValidField(field:string):boolean{
    return (
    (this.loginForm.get(field).touched 
    || this.loginForm.get(field).dirty) 
    && !this.loginForm.get(field).valid
    );
  }


}
