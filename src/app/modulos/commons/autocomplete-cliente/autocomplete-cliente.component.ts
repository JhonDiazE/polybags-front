import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/cliente';
import { CommonsService } from '../commons.service';

@Component({
  selector: 'app-autocomplete-cliente',
  templateUrl: './autocomplete-cliente.component.html',
  styleUrls: ['./autocomplete-cliente.component.scss']
})
export class AutocompleteClienteComponent implements OnInit {

  selectedCliente: Cliente;
  filteredClientes: Cliente[];
  clientes: Cliente[];

  constructor(private commonsService:CommonsService) { }

  ngOnInit(): void {
    this.commonsService.getAllClientes().subscribe(
      {
        next: (response)=>{
          this.clientes = response;
        },
        error: (error)=>{
          console.log(error);
        },
        complete:()=>{

        }
      }
    );
  }


  filterCountry(event) {
    console.log(event);
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered : Cliente[] = [];
    let query = event.query;
    this.clientes.forEach(e=>{
      if (e.nombreComercial.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(e);
    }
    });

    this.filteredClientes = filtered;
  }
}
