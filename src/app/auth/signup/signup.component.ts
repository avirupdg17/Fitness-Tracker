import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  public signUpForm: FormGroup;
  public maxDate: Date;
  public hide = true;
  constructor() {
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
  }
}
