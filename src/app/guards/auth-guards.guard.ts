import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardsGuard implements CanActivate {
  constructor( private auth:AngularFireAuth, private route:Router) {}


  canActivate() :Observable<boolean> {
    return  this.auth.authState.pipe(map(auth=>{
      if(!auth){
        this.route.navigate(['/Login'])
        return false
      }
      else{
        return true
      }
    }))

  }



}
