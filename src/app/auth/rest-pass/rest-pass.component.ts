import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ContrasenaService } from 'src/app/services/contrasena.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-rest-pass',
  templateUrl: './rest-pass.component.html',
  styleUrls: ['./rest-pass.component.css']
})
export class RestPassComponent implements OnInit {

  public resetForm = this.fb.group({
    codigo: [ '' , [Validators.required] ],
    password: ['', [Validators.required,Validators.minLength(6)]],
    password2: ['', [Validators.required,Validators.minLength(6)]],
  });

  constructor(private router:Router,
              private fb: FormBuilder,
              private contrasenaService: ContrasenaService) { }

  ngOnInit(): void {
  }

  resetPass() {
    //console.log(this.resetForm.value);
    this.contrasenaService.reestablecerContrasena(this.resetForm.value).
      subscribe( (resp:any) => {
        console.log(resp);
        Swal.fire('Contraseña Actualizada' , 'Termine de iniciar sesion ' , 'success');
        this.router.navigateByUrl('/');
      }, (err) => {
        //Si sucede algun error
        Swal.fire('Error' , err.error.msg, 'error');
      });

  }

}
