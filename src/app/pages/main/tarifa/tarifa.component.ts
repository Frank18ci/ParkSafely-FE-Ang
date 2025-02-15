import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Conexion1Service } from '../../../services/ConexionApi/conexion1.service';
import { Tarifa } from '../../../models/Tarifa';
import { TipoVehiculo } from '../../../models/TipoVehiculo';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';

declare var bootstrap: any;

@Component({
  selector: 'app-tarifa',
  imports: [ReactiveFormsModule],
  templateUrl: './tarifa.component.html',
  styleUrl: './tarifa.component.css'
})
export class TarifaComponent implements OnInit{
  tarifas : Tarifa[] = []
  tipoVehiculos : TipoVehiculo[] = []
  constructor(private serviceApi : Conexion1Service, @Inject(PLATFORM_ID) private platformId: Object){
    this.loadTarifaTipoVehiculo()
  }
  loadTarifaTipoVehiculo(){
    this.loadTipoVehiculo()
    this.loadTarifa()
  }
  loadTarifa(){
    this.serviceApi.loadTarifa().subscribe(data =>{
      this.tarifas = data
    })
  }
  loadTipoVehiculo(){
    this.serviceApi.loadTipoVehiculo().subscribe(data =>{
      this.tipoVehiculos = data
    })
  }
  formTarifa = new FormGroup({
    categoria: new FormControl(0, Validators.required),
    tarifaPorHora: new FormControl(0, Validators.required),
    tarifaPorDia: new FormControl(0, Validators.required)
  })
  private modalInstance: any;
  ngOnInit(): void {
    if(isPlatformBrowser(this.platformId)){
          //busqueda de modal de tarifa
          const modalElement = document.getElementById('modelTarifa');
          if (modalElement)
            this.modalInstance = new bootstrap.Modal(modalElement);
      }
  }

  activarModal() {
    if (this.modalInstance) {
      this.modalInstance.show();
    }
  }

  desactivarModal() {
    if (this.modalInstance) {
      this.modalInstance.hide();
    }
  }
  tarifaE : Tarifa = {id:0, estado: false, fechaActualizacion: new Date(),
    idTipoVehiculo: 0,
    tarifaPorDia: 0,
    tarifaPorHora: 0,
    tipoVehiculo: ""
  }
  openModal(tarifa: Tarifa | null){
    this.tarifaE.id = 0
    this.formTarifa.reset()
    if(tarifa){
      console.log(tarifa)
      this.formTarifa.controls['categoria'].setValue(tarifa.idTipoVehiculo)
      this.formTarifa.controls['tarifaPorHora'].setValue(tarifa.tarifaPorHora);
      this.formTarifa.controls['tarifaPorDia'].setValue(tarifa.tarifaPorDia)
      this.tarifaE.id = tarifa.id
    }
    
  }

  saveUpdateTarifa(){
    if(this.formTarifa.controls['categoria'].value &&
      this.formTarifa.controls['tarifaPorHora'].value &&
      this.formTarifa.controls['tarifaPorDia'].value
    ){
      this.tarifaE.idTipoVehiculo = this.formTarifa.controls['categoria'].value
      this.tarifaE.tarifaPorHora = this.formTarifa.controls['tarifaPorHora'].value
      this.tarifaE.tarifaPorDia = this.formTarifa.controls['tarifaPorDia'].value
    }

    if(this.tarifaE.id){
      console.log("update")
      this.serviceApi.updateTarifa(this.tarifaE).subscribe(data => {
        if(data){
          this.loadTarifaTipoVehiculo()
          this.desactivarModal()
        }
      })
    } else{
      console.log("create")
      this.tarifaE.id = 0
      console.log(this.tarifaE)
      this.serviceApi.saveTarifa(this.tarifaE).subscribe(data =>{
        if(data){
          this.loadTarifaTipoVehiculo()
          this.desactivarModal()
        }
      })
    }
  }
  eliminarTarifa(id: number){
    this.serviceApi.deleteTarifa(id).subscribe(data => {
      if(data){
        this.loadTarifaTipoVehiculo()
      }
    })
  }
}
