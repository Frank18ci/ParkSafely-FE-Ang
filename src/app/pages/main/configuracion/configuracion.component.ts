import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Conexion1Service } from '../../../services/ConexionApi/conexion1.service';
import { Estacionamiento } from '../../../models/Estacionamiento';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-configuracion',
  imports: [ReactiveFormsModule],
  templateUrl: './configuracion.component.html',
  styleUrl: './configuracion.component.css'
})
export class ConfiguracionComponent {
  estacionamiento : Estacionamiento = {id: 1, nombre: 'Sin nombre', ubicacion: 'No ubicacion', nombrePropietario: '', porcentajeDeImpuesto: '', toleranciaMinutosCobro: '', numeroTelefono: ''}
  formConfiguracion = new FormGroup({
    nombre: new FormControl('', Validators.required),
    ubicacion: new FormControl('', Validators.required),
    nombrePropietario: new FormControl('', Validators.required),
    porcentajeDeImpuesto: new FormControl('', Validators.required),
    toleranciaMinutosCobro: new FormControl('', Validators.required),
    numeroTelefono: new FormControl('', Validators.required)
  })
  constructor(private serviceApi: Conexion1Service,
    private toastr : ToastrService
  ){
    this.loadConfiguracion()  
  }
  loadConfiguracion(){
    this.serviceApi.loadConfiguracion().subscribe(data =>{
      this.estacionamiento = data
      if(this.estacionamiento){
        this.formConfiguracion.patchValue(this.estacionamiento);
      }
    })
  }
  estacionamientoNuevo : Estacionamiento = {id: 1, nombre: 'Sin nombre', ubicacion: 'No ubicacion', nombrePropietario: '', porcentajeDeImpuesto: '', toleranciaMinutosCobro: '', numeroTelefono: ''} 
  changeConfiguracion(){
    this.estacionamientoNuevo = this.formConfiguracion.value as Estacionamiento;
    this.estacionamientoNuevo.id = 1
    console.log(this.estacionamientoNuevo)
    this.serviceApi.updateConfiguracion(this.estacionamientoNuevo).subscribe(data =>{
      console.log(data)
      this.loadConfiguracion()
      this.toastr.success("Configuracion actualizada")
    })
  }
}
