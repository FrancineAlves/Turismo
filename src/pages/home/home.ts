import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AddPontoTuristicoPage } from '../add-ponto-turistico/add-ponto-turistico';
import { PontoTuristicoProvider } from '../../providers/ponto-turistico/ponto-turistico';
import { Observable } from 'rxjs/Observable';

declare var google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  pontoTuristico: Observable<any>;
  map: any;
  latLng: any;
  
  constructor(public navCtrl: NavController, private provider: PontoTuristicoProvider) { 

  this.pontoTuristico = this.provider.getAll();

  console.log(this.pontoTuristico);
  
  }

  ionViewDidLoad(){
    
    var options = {
      zoom:8,
      center:{lat:-26.4751481,lng:-49.0266867},
      disableDoubleClickZoom: true // disable the default map zoom on double click
    }

    var map = new google.maps.Map(document.getElementById('map'), options);
    
    this.showPontoTuristico(map);

    // Update lat/long value of div when anywhere in the map is clicked    
    google.maps.event.addListener(map,'click',function(event) {                
        document.getElementById('latclicked').innerHTML = event.latLng.lat();
        document.getElementById('longclicked').innerHTML =  event.latLng.lng();
      
        addMarker({coords:event.latLng});
    });
    
      // Add Marker Function
      function addMarker(props){
        var marker = new google.maps.Marker({
          position:props.coords,
          map: map
          //icon:props.iconImage
        });

        // Check for customicon
        if(props.iconImage){
          // Set icon image
          marker.setIcon(props.iconImage);
        }

        // Check content
        if(props.content){
          var infoWindow = new google.maps.InfoWindow({
            content:props.content
          });

          marker.addListener('click', function(){
            infoWindow.open(map, marker);
          });
        }
      }
    }

  navigateAddPontoTuristico(){
   
    var latitude = document.getElementById("latclicked").innerText;
    var longitude = document.getElementById("longclicked").innerText;
    
    // Navegar o usuário para a AddPontoTuristicoPage
    this.navCtrl.push(AddPontoTuristicoPage, {latitude: latitude, longitude: longitude});
  }

  validaAddPonto(){
    var latitude = document.getElementById("latclicked").innerText;

    if (latitude == "Latitude") return false
    return true
  }

  showPontoTuristico(map){

      this.pontoTuristico.forEach(pntTuristico => {
        pntTuristico.forEach(pnt => {
           var markers = [
            {
              coords:{lat: parseFloat(pnt.latitude),lng: parseFloat(pnt.longitude)},
              content: pnt.name
            }
          ];
          addMarker(markers[0]);
        });
      });

    // Add Marker Function
    function addMarker(props){
      var marker = new google.maps.Marker({
        position:props.coords,
        map:map,
      });

      // Check for customicon
      if(props.iconImage){
        // Set icon image
        marker.setIcon(props.iconImage);
      }

      // Check content
      if(props.content){
        var infoWindow = new google.maps.InfoWindow({
          content:props.content
        });

        marker.addListener('click', function(){
          infoWindow.open(map, marker);
        });
      }
    }
}
}