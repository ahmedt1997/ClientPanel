import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Client} from '../modals/Client';
import {Observable} from 'rxjs';
import {observableToBeFn} from 'rxjs/internal/testing/TestScheduler';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClientService {


  client:Observable<Client[]>

  private clientsCollection: AngularFirestoreCollection<Client>;
  private clientDocument: AngularFirestoreDocument<Client>;

  constructor(private afs: AngularFirestore) {
    this.clientsCollection = this.afs.collection('clients');
    this.client = this.clientsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Client;
        const id = a.payload.doc.id;
        return { id, ...data };
      })));
  }
  getClient(){
    return this.client
  }
  AddClient(client:Client){
    this.clientsCollection.add(client);

  }

  DetailsClient(id:string):Observable<Client>{
    return this.clientsCollection.doc(id).valueChanges();

  }

  upDateClient(client:Client){
    this.clientDocument=this.clientsCollection.doc(client.id);
    this.clientDocument.update(client);

  }
  DeleteClient(id:string){
    this.clientDocument=this.clientsCollection.doc(id);
    this.clientDocument.delete();
  }






}
