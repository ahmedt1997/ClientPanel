import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Client } from 'src/app/modals/Client';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {
  id:string
  client:Client = {
    firstname:"",
    lastname:"",
    email:"",
    phone:null,
    balance:null
  }

  constructor(  private clientService:ClientService,
                private flashMsg:FlashMessagesService, 
                private Route:ActivatedRoute,
                private route:Router) { }

  ngOnInit(): void {

    this.id=this.Route.snapshot.params['id'];
    this.clientService.DetailsClient(this.id).subscribe(value => {
      this.client=value;

    })
  }
  editer(){
    this.client.id=this.id;
    this.clientService.upDateClient(this.client);
    this.flashMsg.show('vous avez bien modifier le nouveau client' , {cssClass: 'alert alert-success', timeout: 2000});
    this.route.navigate(['/']);
    
  }

}
