import { AuthService } from './../../auth/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent {
  constructor(private authService: AuthService) {}

  logout() {
    this.authService.logout();
  }
}
