import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate {
  constructor(private authService: AuthService) {}

  canActivate() {
    return this.authService.isAuth();
  }
}
