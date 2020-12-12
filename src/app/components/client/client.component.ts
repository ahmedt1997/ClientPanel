import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/modals/Client';
import {ClientService} from '../../services/client.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  clients:Client[]
  search_Client:Client[]
  Total:number=0
  client:Client={

  }


  constructor(private clientService:ClientService , private FlashMessage: FlashMessagesService , private Route2:Router) { }

  ngOnInit(): void {
    this.clientService.getClient().subscribe(value => {
      this.search_Client=this.clients=value;
      this.Total= this.getTotale();
      console.log(this.clients)
    })
  }
  getTotale(){
     return this.clients.reduce((previousValue, currentValue) => {
         return previousValue+currentValue.balance
     } , 0

     )
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
        this.clientService.DeleteClient(id2);
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

    //id2=this.id




  }

  search(value: string) {
    this.search_Client = (value) ? this.clients.filter(client => client.firstname.toLocaleLowerCase().includes(value.toLocaleLowerCase()) ||
      client.lastname.toLocaleLowerCase().includes(value.toLocaleLowerCase())
    ) : this.clients
  }
}
