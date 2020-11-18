import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css' ]
})
export class RegisterComponent  {

  public formSumitted = false;

  public registerForm = this.fb.group({

    nombre: ['gustavo', [Validators.required,Validators.minLength(3)]],
    email: ['prueba@gmail.com', [Validators.required, Validators.email]],
    password: ['', [Validators.required,Validators.minLength(6)]],
    password2: ['', [Validators.required,Validators.minLength(6)]],
    terminos:[false, Validators.required],
  }, {
    validators: this.passwordsIguales('password' , 'password2')
  });

  constructor(private fb: FormBuilder,
              private usuarioService: UsuarioService,
              private router: Router ) { }

  crearUsuario(){

    this.formSumitted = true;

    /**
     * comando para ver lo que esta capturando el formilario
     */
    //console.log(this.registerForm.value);

    if(this.registerForm.invalid){
      return
    } 

    //Realizar posteo y mandar la data del formulario
    this.usuarioService.crearUsuario(this.registerForm.value)
      .subscribe(resp => {
        //console.log('usuario creado');
        //console.log(resp);
        //navegar al dashboard
        this.router.navigateByUrl('/');
      }, (err) => {
        //Si sucede algun error
        Swal.fire('Error' , err.error.msg, 'error');
      });

  }

  campoNoValido(campo:string): boolean{

   // return false;

   if( this.registerForm.get(campo).invalid && this.formSumitted){
      return true;
   } else{
     return false;
   }

  }

  contrasenasNoValidas(){
    const pass1 = this.registerForm.get('password').value;
    const pass2 = this.registerForm.get('password2').value;

    if((pass1 !== pass2) && this.formSumitted){
      return true;
    } else {
      return false;
    }

  }

  aceptaTerminos() {
    return !this.registerForm.get('terminos').value && this.formSumitted;
  }

  passwordsIguales(passName: string, pass2Name: string){
      return (formGroup: FormGroup) => {
        const pass1Control = formGroup.get(passName);
        const pass2Control = formGroup.get(pass2Name);

        if( pass1Control.value === pass2Control.value){
          pass2Control.setErrors(null);

        } else {
          pass2Control.setErrors({noEsIgual: true})
        }
      }


  }

}
