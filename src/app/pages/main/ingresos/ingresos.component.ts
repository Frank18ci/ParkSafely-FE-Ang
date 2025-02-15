import { DatePipe } from '@angular/common';
import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';

import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidatorPlacaVehicular } from '../../../validators/ValidatorPlacaVehicular';
import {interval, timer} from 'rxjs'
import { Conexion1Service } from '../../../services/ConexionApi/conexion1.service';
import { TipoVehiculo } from '../../../models/TipoVehiculo';
registerLocaleData(localeEs);

@Component({
  selector: 'app-ingresos',
  imports: [DatePipe, ReactiveFormsModule],
  templateUrl: './ingresos.component.html',
  styleUrl: './ingresos.component.css'
})
export class IngresosComponent implements OnInit, OnDestroy{ 

  ingresoGroup = new FormGroup({
    numeroPlaca: new FormControl('', [
      Validators.required,
      ValidatorPlacaVehicular
    ])})
  

  hora: string = '';
  fecha: Date;
  
  tipoVehiculos : TipoVehiculo[] = []
  constructor(private serviceApi : Conexion1Service){
    const ahora = new Date();
    this.fecha = ahora;
    //realiza la consulta de tipo vehiculo y la asigna a la variable
    serviceApi.loadTipoVehiculo().subscribe(data =>{
      this.tipoVehiculos = data
    })
  }
  private intervalo!: ReturnType<typeof setInterval>;
  ngOnInit(): void {
    const contador = timer(1000)
    contador.subscribe((n) => {
     this.actualizarHora()
    })
  }
  actualizarHora(){
    const ahora = new Date();
    this.hora = ahora.getHours() + ":" + ahora.getMinutes() + ":" + ahora.getSeconds();
  }
  ngOnDestroy(): void {
  }
}
