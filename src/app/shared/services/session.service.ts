import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  constructor() {}

  getSession() {
    return sessionStorage.getItem('uid');
  }
  setSession(uid: string) {
    sessionStorage.setItem('uid', uid);
  }
}
