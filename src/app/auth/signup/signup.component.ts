import { formatCurrency } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AccessDeniedComponent } from '../access-denied/access-denied.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  public signUpForm: FormGroup;
  public maxDate: Date;
  public hide = true;
  constructor(
    private authService: AuthService,
    private dialog: MatDialog,
    private router: Router
  ) {
    this.signUpForm = new FormGroup({});
    this.maxDate = new Date();
  }
  ngOnInit() {
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
    this.signUpForm = new FormGroup({
      emailId: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      dateOfBirth: new FormControl('', [Validators.required]),
      agreement: new FormControl('', [Validators.requiredTrue]),
    });
  }

  onSubmit() {
    console.log(this.signUpForm);
    this.authService
      .registerUser({
        email: this.signUpForm.get('emailId')?.value,
        password: this.signUpForm.get('password')?.value,
        dateOfBirth: this.signUpForm.get('dateOfBirth')?.value,
      })
      .subscribe({
        next: (value) => {
          console.log(value);
          this.authService.authChange.next(true);
          this.router.navigate(['/training']);
        },
        error: (e) => {
          this.authService.authChange.next(false);
          console.log(e.code);
          console.log(e);
          if (e.code == 'auth/email-already-in-use') {
            this.dialog.open(AccessDeniedComponent, {
              data: {
                heading: 'User already exists',
                content:
                  'Email already exists. Please sign in or use a different email id to create account',
              },
              width: '500px',
              height: '180px',
            });
          }
        },
      });
  }
}
