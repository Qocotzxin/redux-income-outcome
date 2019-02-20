import { Injectable, OnDestroy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AppUser } from './model/auth.models';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Subject } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {
  private readonly ngUnsubscribe$ = new Subject<void>();

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private afDb: AngularFirestore
  ) {}

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  isAuth() {
    return this.afAuth.authState.pipe(
      takeUntil(this.ngUnsubscribe$),
      map(user => {
        if (user === null) {
          this.router.navigate(['/login']);
        }

        return user !== null;
      })
    );
  }

  createUser(user: AppUser) {
    this.afAuth.auth
      .createUserWithEmailAndPassword(user.email, user.password)
      .then(response => {
        const newUser: AppUser = {
          ...user,
          uid: response.user.uid
        };

        this.afDb
          .doc(`${newUser.uid}/usuario`)
          .set(newUser)
          .then(() => {
            this.router.navigate(['/']);
          });
      })
      .catch(error => Swal.fire('Error', error.message, 'error'));
  }

  login(user: AppUser) {
    this.afAuth.auth
      .signInWithEmailAndPassword(user.email, user.password)
      .then(() => this.router.navigate(['/dashboard']))
      .catch(error => Swal.fire('Error', error.message, 'error'));
  }

  logout() {
    this.afAuth.auth
      .signOut()
      .then(() => this.router.navigate(['/login']))
      .catch(error => Swal.fire('Error', error.message, 'error'));
  }
}
