import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { TarifaComponent } from './pages/main/tarifa/tarifa.component';
import { IngresosComponent } from './pages/main/ingresos/ingresos.component';
import { SalidasComponent } from './pages/main/salidas/salidas.component';
import { PendienteDePagoComponent } from './pages/main/pendiente-de-pago/pendiente-de-pago.component';
import { ConfiguracionComponent } from './pages/main/configuracion/configuracion.component';
import { EstadisticasComponent } from './pages/main/estadisticas/estadisticas.component';
import { PagosComponent } from './pages/main/pagos/pagos.component';
import { CategoriaVehiculoComponent } from './pages/main/categoria-vehiculo/categoria-vehiculo.component';

export const routes: Routes = [
    
    {
        path: "tarifa",
        component: TarifaComponent
    },
    {
        path: "ingresos",
        component: IngresosComponent
    },
    {
        path: "salidas",
        component: SalidasComponent
    },
    {
        path: "pagos",
        component: PagosComponent
    },
    {
        path: "pedienteDePago",
        component: PendienteDePagoComponent
    },
    {
        path: "configuracion",
        component: ConfiguracionComponent
    },
    {
        path: "estadisticas",
        component: EstadisticasComponent
    },
    {
        path: "tipovehiculo",
        component: CategoriaVehiculoComponent
    },
    {
        path: "auth",
        children: [
            {
                path: "login",
                component: LoginComponent
            }
        ]
    },
    {
        path: '',
        redirectTo: "auth/login",
        pathMatch: 'full'
    },
];
