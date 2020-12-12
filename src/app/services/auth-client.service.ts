import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import firebase from 'firebase';
import auth = firebase.auth;
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthClientService {

  constructor(private afAuth:AngularFireAuth) { }
  login(email:string,password:string){
    return new Promise((resolve, reject)=>{
      this.afAuth.signInWithEmailAndPassword(email,password).then((userData)=>resolve(userData),
        (error)=>reject(error)
        )
    })

  }

  //login with google account

  LoginWithGoogle(){
    return new Promise((resolve, reject)=>{
      this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then((userData)=>resolve(userData),
        (error)=>reject(error)
      )
    })

  }
  //pour verifier authentification sans avoir retour vers le login
  verifier(){
    return this.afAuth.authState.pipe(map(auth=>auth));
  }

  Logout(){
     this.afAuth.signOut();

  }

}
