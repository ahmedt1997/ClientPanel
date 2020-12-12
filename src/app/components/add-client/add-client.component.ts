import { Component, OnInit } from '@angular/core';
import {Client} from '../../modals/Client';
import {ClientService} from '../../services/client.service';
import {Route, Router} from '@angular/router';
import {FlashMessage} from 'angular2-flash-messages/module/flash-message';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {
  client:Client = {
    firstname:"",
    lastname:"",
    email:"",
    phone:null,
    balance:null
  }

  constructor(private clientService:ClientService , private route:Router , private flashMsg:FlashMessagesService) { }

  ngOnInit(): void {
  }

  Ajouter() {
    this.clientService.AddClient(this.client);
    this.flashMsg.show('vous avez bien Ajouter le nouveau client' , {cssClass: 'alert alert-success', timeout: 2000})
    this.route.navigate(['/'])

  }
}
