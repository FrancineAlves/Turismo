import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { PontoTuristicoProvider } from '../../providers/ponto-turistico/ponto-turistico';

@IonicPage()
@Component({
  selector: 'page-add-ponto-turistico',
  templateUrl: 'add-ponto-turistico.html',
})
export class AddPontoTuristicoPage {

  title: string;
  form: FormGroup;
  pontoTuristico: any;
  latitude: any;
  longitude: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
  private formBuilder: FormBuilder, private provider: PontoTuristicoProvider,
  private toast: ToastController) {
    
    this.pontoTuristico = this.navParams.data.pontoTuristico || {};
    this.createForm();
    this.setupPageTitle();
    this.latitude = navParams.get('latitude');
    this.longitude = navParams.get('longitude');
    console.log(this.longitude + " - " + this.longitude);
  }

  // Alterar Título
  private setupPageTitle(){
    this.title = this.navParams.data.pontoTuristico ? 'Alterar Ponto Turístico' : 'Novo Ponto Turístico';
  }

  // Formulário
  createForm(){
       
    console.log(" Form " + this.navParams.data.latitude + " - " + this.navParams.data.longitude);
    this.form = this.formBuilder.group({
      key: [this.pontoTuristico.key],
      name: [this.pontoTuristico.name, Validators.required],
      description: [this.pontoTuristico.description, Validators.required],
      latitude: [this.navParams.data.latitude],
      longitude: [this.navParams.data.longitude]
    });
  }

  // Ação do Botão que chama o metodo salvar do firebase
  onSubmit() {
    if (this.form.valid){
      this.provider.save(this.form.value)
      .then(() =>{
        this.toast.create({ message: 'Ponto Turístico salvo com sucesso.', duration: 3000}).present();
        this.navCtrl.pop();
      })
      .catch((e) => {
        this.toast.create({ message: 'Erro ao salvar o Ponto Turístico.', duration: 3000}).present();
        console.log(e);
      });
    }
  }
}