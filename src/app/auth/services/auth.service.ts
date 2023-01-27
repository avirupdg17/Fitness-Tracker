import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthData } from '../auth-data.model';
import { User } from '../user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public authChange = new BehaviorSubject<boolean>(false);
  private user: User;
  constructor(private router: Router) {
    this.user = { email: '', userId: '' };
  }
  registerUser(authData: AuthData) {
    //console.log(authData);
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString(),
    };
    this.successfulAuth();
  }
  loginUser(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString(),
    };
    this.successfulAuth();
  }

  private successfulAuth() {
    this.authChange.next(true);
    this.router.navigate(['/training']);
  }
  logout() {
    this.user = { email: '', userId: '' };
    this.authChange.next(false);
    this.router.navigate(['/login']);
  }
  getUser() {
    return { ...this.user };
  }
  isAuth() {
    return !!this.user.userId;
  }
}
