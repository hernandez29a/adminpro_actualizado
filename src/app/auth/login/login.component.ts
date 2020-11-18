import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css' ]
})
export class LoginComponent {

  public formSumitted = false;

  public loginForm = this.fb.group({
 
    email: [localStorage.getItem('email') || '', [Validators.required, Validators.email]],
    password: ['', [Validators.required,Validators.minLength(6)]],
    remember: [false]
  });

  constructor(private router: Router, private fb: FormBuilder,
              private usuarioServicie: UsuarioService) { }

  
  login(){
    //console.log(this.loginForm.value);
    //console.log('submit');
    //this.router.navigateByUrl('/');

    this.usuarioServicie.login(this.loginForm.value)
      .subscribe( resp => {

        if( this.loginForm.get('remember').value){
          localStorage.setItem('email', this.loginForm.get('email').value );
          //navegar al dashboard
          this.router.navigateByUrl('/');
        } else{
          localStorage.removeItem('email');
          this.router.navigateByUrl('/');
        }
        //console.log(resp);
      }, (err) => {
        //Si sucede algun error
        Swal.fire('Error' , err.error.msg, 'error');
      });
  }

}
