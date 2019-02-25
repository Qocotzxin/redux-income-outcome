import {
  ActivateLoadingAction,
  DeactivateLoadingAction
} from './../shared/ui.actions';
import { AppState } from 'src/app/app.reducer';
import { ItemService } from './items.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
@Component({
  selector: 'app-income-outcome',
  templateUrl: './income-outcome.component.html'
})
export class IncomeOutcomeComponent {
  itemForm: FormGroup = new FormGroup({
    description: new FormControl('', Validators.required),
    amount: new FormControl(0, Validators.min(0)),
    income: new FormControl(true)
  });

  constructor(
    private itemService: ItemService,
    private store: Store<AppState>
  ) {}

  changeType() {
    this.itemForm.patchValue({
      income: !this.itemForm.get('income').value
    });
  }

  createItem() {
    this.store.dispatch(new ActivateLoadingAction());
    this.itemService
      .createItem(this.itemForm.value)
      .then(() => {
        this.store.dispatch(new DeactivateLoadingAction());

        Swal.fire(
          'Successfully created!',
          this.itemForm.get('description').value,
          'success'
        );

        this.itemForm.reset({
          amount: 0,
          income: true
        });
      })
      .catch(error => {
        this.store.dispatch(new DeactivateLoadingAction());
        Swal.fire('Error', error.message, 'error');
      });
  }
}
