import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public loginForm: FormGroup;
  public hide: boolean = true;
  constructor(private authService: AuthService) {
    this.loginForm = new FormGroup({});
  }
  ngOnInit() {
    this.loginForm = new FormGroup({
      emailId: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  onSubmit() {
    //console.log(this.loginForm);
    this.authService.registerUser({
      email: this.loginForm.get('emailId')?.value,
      password: this.loginForm.get('password')?.value,
    });
  }
}
