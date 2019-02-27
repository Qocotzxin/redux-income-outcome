import { Injectable, OnDestroy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { filter, map, switchMap, takeUntil } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { AuthService } from '../auth/auth.service';
import { LazyAuthState } from './../auth/auth.reducer';
import { Item } from './model/income-outcome.model';

@Injectable({
  providedIn: 'root'
})
export class ItemService implements OnDestroy {
  private readonly ngUnsubscribe$ = new Subject<void>();

  constructor(
    private afDb: AngularFirestore,
    private authService: AuthService,
    private store: Store<LazyAuthState>
  ) {}

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  itemsListener(): Observable<any[]> {
    return this.store.select('auth').pipe(
      takeUntil(this.ngUnsubscribe$),
      filter(auth => auth.user !== null && auth.user !== undefined),
      switchMap(auth => {
        return this.afDb
          .collection(`${auth.user.uid}/income-outcome/items`)
          .snapshotChanges()
          .pipe(
            map(itemData => {
              return itemData.map(item => {
                return {
                  ...item.payload.doc.data(),
                  uid: item.payload.doc.id
                };
              });
            })
          );
      })
    );
  }

  createItem(data: Item) {
    return this.afDb
      .doc(`${this.authService.getUser().uid}/income-outcome`)
      .collection('items')
      .add({ ...data });
  }

  removeItem(item: Item) {
    this.afDb
      .doc(`${this.authService.getUser().uid}/income-outcome/items/${item.uid}`)
      .delete()
      .then(() =>
        Swal.fire('Success', `'${item.description}' was removed`, 'success')
      )
      .catch(error => Swal.fire('Error', error.message, 'error'));
  }
}
