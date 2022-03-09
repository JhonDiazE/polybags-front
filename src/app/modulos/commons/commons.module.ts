import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutocompleteClienteComponent } from './autocomplete-cliente/autocomplete-cliente.component';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AutocompleteClienteComponent
  ],
  imports: [
    CommonModule,
    AutoCompleteModule,
    FormsModule
  ],
  exports:[
    AutocompleteClienteComponent
  ]
})
export class CommonsModule { }
