import { Component, OnInit } from '@angular/core';
import {ClientService} from '../../services/client.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {ActivatedRoute, Router} from '@angular/router';
import {Client} from '../../modals/Client';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-details-client',
  templateUrl: './details-client.component.html',
  styleUrls: ['./details-client.component.css']
})
export class DetailsClientComponent implements OnInit {
  client:Client={

  }


  id:string;
  showbalance: boolean = false;


  constructor(private ClientService:ClientService,
              private FlashMessage:FlashMessagesService, 
              private Route:ActivatedRoute, 
              private Route2:Router) { }

  ngOnInit(): void {
    // ici on recupere le id de la route dynamique . voir app-routing.module.ts
    this.id=this.Route.snapshot.params['id'];
    this.ClientService.DetailsClient(this.id).subscribe(value => {
      this.client=value;

    })

  }

  submit() {
    this.client.id=this.id
    this.ClientService.upDateClient(this.client)
    this.FlashMessage.show('modification avec succes',{ cssClass: 'alert-success', timeout: 2000 })
    this.showbalance=false

  }
  delete(id2:string){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {

        this.ClientService.DeleteClient(id2);
        this.FlashMessage.show('modification avec succes',{ cssClass: 'alert-warning', timeout: 2000 })
        this.Route2.navigate(['/']);

        swalWithBootstrapButtons.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
    })


    }




  afficher(id2: string) {
    id2=this.id
    console.log(id2)

  }
}
