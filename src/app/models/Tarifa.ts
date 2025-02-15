export interface Tarifa{
    id: number,
    tipoVehiculo: string,
    idTipoVehiculo: number,
    tarifaPorHora: number,
    tarifaPorDia: number,
    fechaActualizacion: Date,
    estado: boolean
}