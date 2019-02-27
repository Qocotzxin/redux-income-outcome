import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanLoad, CanActivate } from '@angular/router';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate, CanLoad {
  constructor(private authService: AuthService) {}

  canActivate() {
    return this.authService.isAuth();
  }

  canLoad() {
    return this.authService.isAuth().pipe(take(1));
  }
}
