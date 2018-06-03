import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class PontoTuristicoProvider {

  private PATH = 'pontoTuristico/';

  constructor(private db: AngularFireDatabase) { }

  getAll(){
    return this.db.list(this.PATH)
    .snapshotChanges()
    .map(changes => {
      return changes.map(c => ({
        key: c.payload.key, ...c.payload.val()}));
    })
  }

  get(key: string){
    return this.db.object(this.PATH + key)
    .snapshotChanges()
    .map(c => {
      return { key: c.key, ...c.payload.val() };
    });
  }

save(pontoTuristico: any) {
  return new Promise((resolve, reject) => {
    if (pontoTuristico.key) {
      this.db.list(this.PATH)
        .update(pontoTuristico.key, {
          name: pontoTuristico.name,
          description: pontoTuristico.description,
          latitude: pontoTuristico.latitude,
          longitude: pontoTuristico.longitude
        })
        .then(() => resolve())
        .catch((e) => reject(e));
    } else {
      this.db.list(this.PATH)
        .push({ 
          name: pontoTuristico.name,
          description: pontoTuristico.description,
          latitude: pontoTuristico.latitude,
          longitude: pontoTuristico.longitude
        })
        .then(() => resolve());
    }
  })
}

remove(key: string){
  return this.db.list(this.PATH).remove(key);
}

}