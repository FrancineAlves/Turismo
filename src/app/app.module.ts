import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { GooglePlus } from '@ionic-native/google-plus';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AddPontoTuristicoPage } from '../pages/add-ponto-turistico/add-ponto-turistico';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import {StartPage} from '../pages/start/start';

import { FIREBASE_CREDENTIALS } from './firebase.credentials';
import { PontoTuristicoProvider } from '../providers/ponto-turistico/ponto-turistico';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AddPontoTuristicoPage,
    LoginPage,
    RegisterPage,
    StartPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CREDENTIALS),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AddPontoTuristicoPage,
    LoginPage,
    RegisterPage,
    StartPage
  ],
  providers: [
    GooglePlus,
    StatusBar,
    SplashScreen,
    AngularFireDatabase,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    PontoTuristicoProvider
  ]
})
export class AppModule {}
