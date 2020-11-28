import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PerfilComponent } from './perfil/perfil.component';

// Mantenimientos
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { MedicoComponent } from './mantenimientos/medicos/medico.component';
import { BusquedasComponent } from './busquedas/busquedas.component';
import { AdminGuard } from '../guard/admin.guard';
import { RestarPasswordComponent } from './restar-password/restar-password.component';

const chilRoutes: Routes = [
  {path: '', component: DashboardComponent, data: {titulo: 'Dashboard'}},
  {path: 'account-setting', component: AccountSettingsComponent, data: {titulo: 'Tema'}},
  {path: 'buscar/:termino', component: BusquedasComponent, data: {titulo: 'Busqueda Global'}},
  {path: 'perfil', component: PerfilComponent, data: {titulo: 'Perfil de Usuario'}},
  {path: 'contrasena', component: RestarPasswordComponent, data: {titulo: 'Actualizar contraseña'}},

  // Mantenimientos
  {path: 'hospitales', component: HospitalesComponent, data: {titulo: 'Mantenimiento de Hospitales'}},
  {path: 'medicos', component: MedicosComponent, data: {titulo: 'Control de Médicos'}},
  {path: 'medico/:id', component: MedicoComponent, data: {titulo: 'Control de Médico'}},
  
  //Rutas del Administrador o super Usuario
  {
    path: 'usuarios',
    component: UsuariosComponent,
    canActivate: [ AdminGuard ],
    data: {titulo: 'Usuarios de Aplicación'}
  },
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(chilRoutes)],
    exports: [RouterModule]
})
export class ChildRoutesModule { }
