import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http'

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { EmailComponent } from './email/email.component';
import { RestPassComponent } from './rest-pass/rest-pass.component';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    EmailComponent,
    RestPassComponent,
  ],
  exports:[
    LoginComponent,
    RegisterComponent,
    EmailComponent,
    RestPassComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class AuthModule { }
