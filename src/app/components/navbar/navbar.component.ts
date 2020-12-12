import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {AuthClientService} from '../../services/auth-client.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn:boolean=false
  UserLoggedIn:string

  constructor(private authService:AuthClientService  , private FlashMessage:FlashMessagesService , private Route:Router) { }

  ngOnInit(): void {
       this.authService.verifier().subscribe(auth=>{
     if(auth){
       this.isLoggedIn=true
       this.UserLoggedIn=auth.email
     }
     else{
       this.isLoggedIn=false
     }
   })
  }
  OnLogOut(){
    this.authService.Logout()
    this.isLoggedIn=false
    return this.Route.navigate(['/Login'])
  }

}
