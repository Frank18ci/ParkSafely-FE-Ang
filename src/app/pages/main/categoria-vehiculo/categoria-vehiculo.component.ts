import { AfterContentInit, Component, ElementRef, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { Conexion1Service } from '../../../services/ConexionApi/conexion1.service';
import { TipoVehiculo } from '../../../models/TipoVehiculo';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';

declare var bootstrap: any;

@Component({
  selector: 'app-categoria-vehiculo',
  imports: [ReactiveFormsModule],
  templateUrl: './categoria-vehiculo.component.html',
  styleUrl: './categoria-vehiculo.component.css'
})
export class CategoriaVehiculoComponent implements OnInit{
  tipoVehiculos :TipoVehiculo[] = []
  constructor(private apiService : Conexion1Service, @Inject(PLATFORM_ID) private platformId: Object){
    this.loadTipoVehiculos()  
  }
  loadTipoVehiculos(){
    this.apiService.loadTipoVehiculo().subscribe(data => 
      this.tipoVehiculos = data
    )
  }  
  
  formVehiculo = new FormGroup({
    tipoVehiculo : new FormControl('', Validators.required) 

  })
  tipoVehiculo : TipoVehiculo = {id:0, estado: false, fechaActualizacion: new Date(), tipo: ""}
  
  openModal(categoriaV: any){
    this.formVehiculo.reset()
    if(categoriaV.id){
      this.formVehiculo.controls['tipoVehiculo'].setValue(categoriaV.tipo)   
      this.tipoVehiculo.id = categoriaV.id
    } else{
      if(this.formVehiculo.controls['tipoVehiculo'].value){
        this.tipoVehiculo.tipo = this.formVehiculo.controls['tipoVehiculo'].value 
      }
    }
    
  }
  saveUpdateTipoVehiculo(){
    console.log(this.tipoVehiculo)
    if(this.formVehiculo.controls['tipoVehiculo'].value){
      this.tipoVehiculo.tipo = this.formVehiculo.controls['tipoVehiculo'].value 
    }
    if(this.tipoVehiculo.id){
      this.apiService.updateTipoVehiculo(this.tipoVehiculo).subscribe(data => {
        if(data){
          this.loadTipoVehiculos()  
          this.desactivarModal()  
        }
      })
    } else{
      this.tipoVehiculo.id = 0
      this.apiService.saveTipoVehiculo(this.tipoVehiculo).subscribe(data => {
        if(data){
          this.loadTipoVehiculos()  
          this.desactivarModal()  
        }
      })
    }
  }
  private modalInstance: any;
  
   ngOnInit(): void {
    if(isPlatformBrowser(this.platformId)){
      //busqueda de modal de tipo vehiculo
      const modalElement = document.getElementById('modelCategoriaVehiculo');
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



  
  
  eliminarTipoVehiculo(id: number){
    
    this.apiService.deleteTipoVehiculo(id).subscribe(data =>{
      if(data){
        this.loadTipoVehiculos()
      }
    
  })}
  
}
