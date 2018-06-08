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
  latitude: any;
  longitude: any;
  
  constructor(public navCtrl: NavController, private provider: PontoTuristicoProvider) { 

    this.pontoTuristico = this.provider.getAll();

  }

  ionViewDidLoad(){
    
    var options = {
      zoom:8,
      center:{lat:-26.4751481,lng:-49.0266867},
    }

    var map = new google.maps.Map(document.getElementById('map'), options);
    
    this.showPontoTuristico(map);

    var save=this;

    // Update lat/long value of div when anywhere in the map is clicked    
    google.maps.event.addListener(map,'click',function(event) {                
        save.latitude=event.latLng.lat();
        save.longitude=event.latLng.lng();
        
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
    this.navCtrl.push(AddPontoTuristicoPage, {latitude: this.latitude, longitude: this.longitude});
  }

  validaAddPonto(){
    if (this.latitude != undefined) return true
    return false
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
