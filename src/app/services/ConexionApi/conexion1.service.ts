import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '../../models/User';
import { Estacionamiento } from '../../models/Estacionamiento';
import { Tarifa } from '../../models/Tarifa';
import { TipoVehiculo } from '../../models/TipoVehiculo';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Conexion1Service {
  private http = inject(HttpClient)
  url: string = "http://localhost:8080"

  constructor() { }
  //Login
  login(user : any){
    return this.http.post<User>(this.url + "/auth/login", user)
  }

  //Configuracion
  loadConfiguracion(){
    return this.http.get<Estacionamiento>(this.url + "/estacionamiento/1")
  }
  updateConfiguracion(estacionamiento : any){
    return this.http.put<Estacionamiento>(this.url + "/estacionamiento", estacionamiento)
  }
  


  //Tarifa
  loadTarifa(){
    return this.http.get<Tarifa[]>(this.url + "/tarifa")
  }
  saveTarifa(tarifa: any){
    return this.http.post<Tarifa>(this.url + "/tarifa", tarifa)
  }
  updateTarifa(tarifa: any){
    return this.http.put<Tarifa>(this.url + "/tarifa", tarifa)
  }
  deleteTarifa(id: number){
    return this.http.delete<Tarifa>(this.url + "/tarifa/" + id)
  }

  //Tipo Vehiculo
  loadTipoVehiculo(){
    return this.http.get<TipoVehiculo[]>(this.url + "/tipovehiculo")
  }
  findTipoVehiculo(id : number){
    return this.http.get<TipoVehiculo>(this.url  + "/tipovehiculo/" + id)
  }
  saveTipoVehiculo(tipoVehiculo : any){
    return this.http.post<TipoVehiculo>(this.url + "/tipovehiculo", tipoVehiculo)
  }
  updateTipoVehiculo(tipoVehiculo : any){
    return this.http.put<TipoVehiculo>(this.url + "/tipovehiculo", tipoVehiculo)
  }
  deleteTipoVehiculo(id : number){
    return this.http.delete<TipoVehiculo>(this.url  + "/tipovehiculo/" + id)
  }
}
