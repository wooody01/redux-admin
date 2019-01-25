import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import Swal from 'sweetalert2'

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from "firebase";

import { map } from 'rxjs/operators';

import { User } from './user.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth, private router: Router, private fstore: AngularFirestore) { }

  initAuthListener() {
    this.afAuth.authState.subscribe((fbUser: firebase.User) => {
      console.log(fbUser);

    })
  }

  crearUsuario(nombre: string, email: string, password: string, ) {
    this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(resp => {
        
        const user: User = {
          uid: resp.user.uid,
          nombre: nombre,
          email: resp.user.email
        }
        
        this.fstore.doc(`${user.uid}/usuario`).set(user).then(()=> {          
          this.router.navigate(['dashboard']);
        });

  }).catch(error => {
    console.error(error);
Swal.fire('Error en el registro', error.message, 'error');

      })
  }

login(email: string, password: string) {
  this.afAuth.auth.signInWithEmailAndPassword(email, password)
    .then(resp => {
      console.log(resp);

      this.router.navigate(['dashboard']);
    })
    .catch(error => {
      console.error(error);
      Swal.fire({ title: 'Error en el login', text: error.message, type: 'error' });
    })
}

logout() {
  this.router.navigate(['login']);
  this.afAuth.auth.signOut();

}

isAuth() {
  return this.afAuth.authState.pipe(map(fbUser => {
    if (fbUser == null) {
      this.router.navigate(['/login']);
    }

    return fbUser != null
  }))
}

}
