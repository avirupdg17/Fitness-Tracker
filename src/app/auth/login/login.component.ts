import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { AccessDeniedComponent } from '../access-denied/access-denied.component';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/shared/services/session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public loginForm: FormGroup;
  public hide: boolean = true;
  constructor(
    private authService: AuthService,
    private dialog: MatDialog,
    private router: Router,
    private sessionService: SessionService
  ) {
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
    this.authService
      .loginUser({
        email: this.loginForm.get('emailId')?.value,
        password: this.loginForm.get('password')?.value,
      })
      .then((val) => {
        if (val.isSuccessful) {
          this.router.navigate(['/training']);
        } else {
          //console.log(val.error);
          //console.log(e);
          if (val.error.code == 'auth/email-already-in-use') {
            this.dialog.open(AccessDeniedComponent, {
              data: {
                heading: 'Access Denied',
                content:
                  'Invalid email or password, please enter valid credentials.',
              },
              width: '500px',
              height: '150px',
            });
          }
        }
      });

    // .subscribe({
    //   next: (value) => {
    //     console.log(value);
    //     this.authService.authChange.next(true);
    //     this.sessionService.setSession(value.user.uid);
    //     this.router.navigate(['/training']);
    //   },
    //   error: (e) => {
    //     this.authService.authChange.next(false);
    //     //console.log(e.code);
    //     //if (e.code == 'auth/user-not-found') {
    //     this.dialog.open(AccessDeniedComponent, {
    //       data: {
    //         heading: 'Access Denied',
    //         content:
    //           'Invalid email or password, please enter valid credentials.',
    //       },
    //       width: '500px',
    //       height: '150px',
    //     });
    //     //}
    //   },
    // });
  }
}
