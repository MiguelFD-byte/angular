import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { AuthService } from '../../../pages/auth/auth.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAdmin=false;
  isLogged= false;

  private suscription : Subscription = new Subscription;

  @Output() toggleSidenav = new EventEmitter<void>();


  constructor(private auth:AuthService){}

  ngOnDestroy(): void {
    this.suscription.unsubscribe();
  }

  ngOnInit(): void {
    this.suscription.add(
    this.auth.isLogged.subscribe((res) => (this.isLogged = res))
    );

   
  }
  

  ontToggleSidenav(){
    this.toggleSidenav.emit();
  }

  onLogOut():void{
    this.auth.logOut();
  }
}
