import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { LazyAuthState } from 'src/app/auth/auth.reducer';
import { AuthService } from './../../auth/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent {
  constructor(
    private authService: AuthService,
    public store: Store<LazyAuthState>
  ) {}

  logout() {
    this.authService.logout();
  }
}
