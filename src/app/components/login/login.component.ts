import { Component, OnInit } from '@angular/core';
import {AuthClientService} from '../../services/auth-client.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import firebase from 'firebase';
import auth = firebase.auth;
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email:string
  password:string

  constructor(private AthService:AuthClientService , private FlashMsg:FlashMessagesService , private Route:Router) { }

  ngOnInit(): void {
    this.AthService.verifier().subscribe(auth=>{
      if(auth){
        return this.Route.navigate(['/']);
      }
    })
  }

  onLogin(){
    this.AthService.login(this.email,this.password).then(auth =>{
      if(auth){
        this.FlashMsg.show('You are logged successfuly',{ cssClass: 'alert-success', timeout: 2000 })
      }
      this.Route.navigate(['/']);

    }).catch(error=>{
      this.FlashMsg.show(error.message,{ cssClass: 'alert-danger', timeout: 5000 })
    })
  }

  GoogleConnection()
  {
    this.AthService.LoginWithGoogle().then(auth =>{
      if(auth){
        this.FlashMsg.show('You are logged successfuly',{ cssClass: 'alert-success', timeout: 2000 })
      }
      this.Route.navigate(['/']);

    }).catch(error=>{
      this.FlashMsg.show('Error of Authentification ',{ cssClass: 'alert-danger', timeout: 5000 })
    })
  }

}
