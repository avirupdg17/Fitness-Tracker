import 'hammerjs';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { WelcomeComponent } from './welcome/welcome.component';

import { TrainingModule } from './training/training.module';
import { AuthModule } from './auth/auth.module';
import { NavigationModule } from './navigation/navigation.module';
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { firebaseConfig } from './firebase.config';
import { config } from 'rxjs';

@NgModule({
  declarations: [AppComponent, WelcomeComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TrainingModule,
    AuthModule,
    NavigationModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MaterialModule,
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
