import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from '../../services/usuario.service';
import { FileUploadService } from '../../services/file-upload.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  
})
export class PerfilComponent implements OnInit {

  public perfilForm: FormGroup;
  public usuario: Usuario;
  public imagenSubir: File;
  public imgTemp: any = null;

  constructor(private fb: FormBuilder,
              private usuarioService: UsuarioService,
              private fileUploadService: FileUploadService ) {

    // cargar datos actualizados
    this.usuario = usuarioService.usuario; 
  }

  ngOnInit(): void {

    this.perfilForm = this.fb.group({
      nombre: [this.usuario.nombre, [Validators.required, Validators.minLength(3)]],
      email: [this.usuario.email, [Validators.required, Validators.email]],
    });
  }

  actualizarPerfil(){
    //console.log(this.perfilForm.value);
    this.usuarioService.actualizarPerfil( this.perfilForm.value)
      .subscribe( resp => {
        const {nombre, email} = this.perfilForm.value;
        this.usuario.nombre = nombre;
        this.usuario.email = email;
        //console.log(resp);

        Swal.fire('Guardado', 'Cambios fueron guardados' , 'success');
      }, (err) => {
        Swal.fire('Error', err.error.msg , 'error');
        //console.log(err.error.msg);
      });

  }

  cambiarImagen(file: File){
    //console.log(file);
    //capturamos la imagen de que envia el usuario

    this.imagenSubir = file;
    if( !file) {
      return this.imgTemp = null;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      //console.log(reader.result);
      this.imgTemp = reader.result;
    }

  }

  subirImagen(){
    this.fileUploadService
      .actualizarFoto(this.imagenSubir, 'usuarios', this.usuario.uid)
      .then( img => {
        this.usuario.imgUrl = img;
        Swal.fire('Guardada', 'Imagen actualizada' , 'success');
      }).catch( err => {
        Swal.fire('Error', err.error.msg , 'error');
        //console.log(err.error.msg);
      });
  }

}
