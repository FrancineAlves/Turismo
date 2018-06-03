import { Component, ViewChild } from '@angular/core';
import { NavController, AlertController,ToastController } from 'ionic-angular';
import { PontoTuristicoProvider } from '../../providers/ponto-turistico/ponto-turistico';

import { LoginPage } from '../login/login';
import { RegisterPage } from '../register/register';
import{HomePage} from '../home/home';


@Component({
  selector: 'page-start',
  templateUrl: 'start.html'
})
export class StartPage {
  @ViewChild('username') uname;
  @ViewChild('password') password;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, private authService:PontoTuristicoProvider,  private toastCtrl: ToastController,) {

  }

  signIn(){
    this.navCtrl.push(LoginPage);
  }

  register(){
    this.navCtrl.push(RegisterPage)
  }

  signInWithGoogle() {
    this.authService.signInWithGoogle()
      .then(() => {
        this.navCtrl.setRoot(HomePage);
      })
      .catch((error) => {
        this.toastCtrl.create({ duration: 3000, position: 'bottom', message: 'Erro ao efetuar o login' })
          .present();
      });
  }

  

}