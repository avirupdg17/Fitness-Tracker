import { BehaviorSubject, EMPTY } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthData } from '../model/auth-data.model';
import { User } from '../model/user.model';
import { Router } from '@angular/router';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { addDoc } from 'firebase/firestore';
import { Firestore, collection } from '@angular/fire/firestore';
import { SessionService } from 'src/app/shared/services/session.service';
import { TrainingService } from 'src/app/training/services/training.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public authChange = new BehaviorSubject<boolean>(false);
  private auth = getAuth();
  constructor(
    private router: Router,
    private db: Firestore,
    private sessionService: SessionService,
    private trainingS: TrainingService
  ) {
    if (this.isAuth()) {
      this.successfulAuth();
    }
  }

  async registerUser(authData: AuthData) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        this.auth,
        authData.email,
        authData.password
      );
      await updateProfile(userCredential.user, {
        displayName: authData.username,
      });
      await this.addUserToDatabase(
        userCredential.user.uid,
        authData.dateOfBirth
      );
      this.sessionService.setSession('user', {
        uid: userCredential.user.uid,
        displayName: authData.username,
      });
      this.successfulAuth();
      return { isSuccessful: true, error: null };
    } catch (error: any) {
      this.failedAuth();
      return { isSuccessful: false, error: error };
    }
  }

  async loginUser(authData: User) {
    try {
      const userCredential = await signInWithEmailAndPassword(
        this.auth,
        authData.email,
        authData.password
      );
      console.log(userCredential);
      this.sessionService.setSession('user', {
        uid: userCredential.user.uid,
        displayName: userCredential.user.displayName,
      });
      this.successfulAuth();
      return { isSuccessful: true, error: null };
    } catch (error: any) {
      this.failedAuth();
      return { isSuccessful: false, error: error };
    }
  }

  private successfulAuth() {
    this.authChange.next(true);
  }
  private failedAuth() {
    this.authChange.next(false);
  }
  logout() {
    this.sessionService.removeSession('user');
    this.auth.signOut();
    this.trainingS.cancelSubscription();
    this.authChange.next(false);
    this.router.navigate(['/login']);
  }
  isAuth() {
    return !!this.sessionService.getSession('user');
  }
  private connectCollectionDatabase(colName: string) {
    const colRef = collection(this.db, colName);
    return colRef;
  }
  async addUserToDatabase(userid: string, dateOfBirth: Date) {
    addDoc(this.connectCollectionDatabase('signedUpUsers'), {
      userid,
      dateOfBirth,
    });
  }
}
