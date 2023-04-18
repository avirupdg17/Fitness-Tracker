import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  constructor() {}

  getSession(sessioKey: string) {
    if (sessionStorage[sessioKey]) return JSON.parse(sessionStorage[sessioKey]);
  }
  setSession(obj: string, data: any) {
    sessionStorage.setItem(obj, JSON.stringify({ ...data }));
  }
  removeSession(sessioKey: string) {
    sessionStorage.removeItem(sessioKey);
  }
}
