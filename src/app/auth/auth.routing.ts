import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { EmailComponent } from './email/email.component';
import { RestPassComponent } from './rest-pass/rest-pass.component';



const routes: Routes = [
    {path: 'login', component: LoginComponent, data: {titulo: 'login'}},
    {path: 'register', component: RegisterComponent, data: {titulo: 'Registro'}},
    {path: 'send-email', component: EmailComponent, data: {titulo: 'Recuperar Contraseña'}},
    {path: 'resetpassword', component: RestPassComponent, data: {titulo: 'Actualizar Contraseña'}},

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule {}
