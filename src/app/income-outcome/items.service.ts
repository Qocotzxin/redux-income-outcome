import { Injectable, OnDestroy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { filter, map, switchMap, takeUntil } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { AppState } from './../app.reducer';
import { Item } from './model/income-outcome.model';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ItemService implements OnDestroy {
  private readonly ngUnsubscribe$ = new Subject<void>();

  constructor(
    private afDb: AngularFirestore,
    private authService: AuthService,
    private store: Store<AppState>
  ) {}

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  itemsListener(): Observable<any[]> {
    return this.store.select('auth').pipe(
      takeUntil(this.ngUnsubscribe$),
      filter(auth => auth.user !== null),
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
