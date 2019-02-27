import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { authReducer } from './auth.reducer';
import { AuthService } from './auth.service';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [
    ReactiveFormsModule,
    AngularFireAuthModule,
    CommonModule,
    RouterModule,
    StoreModule.forFeature('auth', authReducer)
  ],
  providers: [AuthService]
})
export class AuthModule {}
