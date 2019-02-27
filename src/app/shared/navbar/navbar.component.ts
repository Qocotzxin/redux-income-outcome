import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { LazyAuthState } from './../../auth/auth.reducer';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent {
  constructor(public store: Store<LazyAuthState>) {}
}
