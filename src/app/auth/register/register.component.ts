import { AuthService } from './../auth.service';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent {
  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  constructor(public authService: AuthService) {}

  onSubmit() {
    this.authService.createUser(this.registerForm.value);
  }
}
