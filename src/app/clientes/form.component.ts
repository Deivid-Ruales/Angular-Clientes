import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent {

  public cliente: Cliente = new Cliente()
  public titulo: string = "Crear Cliente"

  constructor(
    private clienteService: ClienteService, 
    private router: Router,
    private activateRoute : ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.cargarCliente()

  }

  cargarCliente(): void{
    this.activateRoute.params.subscribe(params =>{
      let id = params['id']
      if(id){
        this.clienteService.getCliente(id).subscribe((cliente) => this.cliente = cliente)
      }
    })
  }

  public create(): void{
    this.clienteService.create(this.cliente).subscribe(
      cliente => {
      this.router.navigate(['/clientes'])
      Swal.fire('Nuevo cliente', `${cliente.nombre} a sido creado con éxito`, 'success')
    }
    )
  }

  updateCliente(): void{
    this.clienteService.updateCliente(this.cliente)
    .subscribe( response =>{
      this.router.navigate(['/clientes'])
      Swal.fire('Cliente Actualizado', `${response.mensaje}: ${response.cliente.nombre}`, 'success')
    })
  }

}
