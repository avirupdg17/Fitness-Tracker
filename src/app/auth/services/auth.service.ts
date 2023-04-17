import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthData } from '../model/auth-data.model';
import { User } from '../model/user.model';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { addDoc } from 'firebase/firestore';
import {
  Firestore,
  collection,
  CollectionReference,
  getDocs,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public authChange = new BehaviorSubject<boolean>(false);
  private user: User;
  private auth = getAuth();
  constructor(private router: Router, private db: Firestore) {
    this.user = { email: '', password: '' };
  }
  registerUser(authData: AuthData) {
    return from(
      createUserWithEmailAndPassword(
        this.auth,
        authData.email,
        authData.password
      )
    );
    // .then((userCredential) => {
    //   // Signed in
    //   const newUser = userCredential.user;
    //   console.log(newUser);
    //   this.addUserToDatabase(newUser.uid, authData.dateOfBirth);
    //   this.successfulAuth();
    //   // ...
    // })
    // .catch((error) => {
    //   const errorCode = error.code;
    //   const errorMessage = error.message;
    //   console.log(error);
    //   // ..
    // });
  }
  loginUser(authData: User) {
    return from(
      signInWithEmailAndPassword(this.auth, authData.email, authData.password)
    );
  }

  private successfulAuth() {
    this.authChange.next(true);
    this.router.navigate(['/training']);
  }
  private failedAuth(error: string) {
    this.authChange.next(false);
    this.router.navigate(['/training']);
  }
  logout() {
    this.user = { email: '', password: '' };
    this.authChange.next(false);
    this.router.navigate(['/login']);
  }
  getUser() {
    return { ...this.user };
  }
  isAuth() {
    return true;
  }
  private connectCollectionDatabase(colName: string) {
    const colRef = collection(this.db, colName);
    return colRef;
  }
  addUserToDatabase(userid: string, dateOfBirth: Date) {
    addDoc(this.connectCollectionDatabase('signedUpUsers'), {
      userid,
      dateOfBirth,
    });
  }
}
