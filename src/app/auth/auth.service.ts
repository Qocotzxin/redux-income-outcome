import { Injectable, OnDestroy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { map, switchMap, takeUntil } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { AppState } from './../app.reducer';
import {
  ActivateLoadingAction,
  DeactivateLoadingAction
} from './../shared/ui.actions';
import { SetUserAction } from './auth.actions';
import { AppUser } from './model/auth.models';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {
  private user: AppUser;

  private readonly ngUnsubscribe$ = new Subject<void>();

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private afDb: AngularFirestore,
    private store: Store<AppState>
  ) {}

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  isAuth() {
    return this.afAuth.authState.pipe(
      takeUntil(this.ngUnsubscribe$),

      switchMap(user => {
        if (user === null) {
          this.redirect('login');
          return;
        } else {
          return this.afDb
            .collection(`${user.uid}`, ref =>
              ref.where('email', '==', user.email)
            )
            .valueChanges()
            .pipe(
              takeUntil(this.ngUnsubscribe$),
              map((appUser: AppUser[]) => {
                this.store.dispatch(new DeactivateLoadingAction());
                if (appUser.length) {
                  this.store.dispatch(new SetUserAction(appUser[0]));
                  this.user = appUser[0];
                  return appUser[0] !== null;
                } else {
                  return false;
                }
              })
            );
        }
      })
    );
  }

  createUser(user: AppUser) {
    this.store.dispatch(new ActivateLoadingAction());

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
            this.redirect('');
          })
          .catch(error => this.sendAlert(error));
      })
      .catch(error => this.sendAlert(error));
  }

  login(user: AppUser) {
    this.store.dispatch(new ActivateLoadingAction());
    this.afAuth.auth
      .signInWithEmailAndPassword(user.email, user.password)
      .then(() => this.redirect('dashboard'))
      .catch(error => this.sendAlert(error));
  }

  logout() {
    this.afAuth.auth
      .signOut()
      .then(() => this.redirect('login'))
      .catch(error => this.sendAlert(error));
  }

  getUser() {
    return { ...this.user };
  }

  private sendAlert(error: Error) {
    this.store.dispatch(new DeactivateLoadingAction());
    return Swal.fire('Error', error.message, 'error');
  }

  private redirect(route: string) {
    if (route !== 'dashboard') {
      this.store.dispatch(new DeactivateLoadingAction());
    }
    this.router.navigate([`/${route}`]);
  }
}
