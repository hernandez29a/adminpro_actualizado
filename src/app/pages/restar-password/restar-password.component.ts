import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ContrasenaService } from 'src/app/services/contrasena.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-restar-password',
  templateUrl: './restar-password.component.html',
  styles: [
  ]
})
export class RestarPasswordComponent implements OnInit {

  public restarForm = this.fb.group({
    password_old: ['', [Validators.required]],
    password_new: ['', [Validators.required]],
    //password_check: [''],
  });

  constructor(private fb : FormBuilder,
              private router: Router,
              private contrasenaService: ContrasenaService) { }

  ngOnInit(): void {
  }

  actualizarContrasena() {
    //console.log(this.restarForm.value);

    this.contrasenaService.actualizarContrasena(this.restarForm.value)
      .subscribe( (resp: any) => {
        Swal.fire('Contraseña Actualizada' , 'La contraseña se ha actualizado con exito' , 'success');
        console.log(resp);
        });
      
  }

}
