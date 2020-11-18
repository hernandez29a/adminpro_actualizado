import { Component, OnInit, OnDestroy } from '@angular/core';
import Swal from 'sweetalert2';

import { Usuario } from 'src/app/models/usuario.model';

import { UsuarioService } from '../../../services/usuario.service';
import { BusquedasService } from '../../../services/busquedas.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { delay } from 'rxjs/operators';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit, OnDestroy {

  public totalUsuario : number = 0;
  public usuarios: Usuario[] = [];
  public usuariosTemp: Usuario[] = [];

  public imgSubs: Subscription;
  public desde: number = 0;
  public cargando: boolean = true;

  constructor(private usuarioService: UsuarioService,
              private busquedasService: BusquedasService,
              private modalImagenService: ModalImagenService) { }
              
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
   this.cargarUsuarios();
   //actualizar la imagen como administrador 
   this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(
        delay(1000)
      )
     .subscribe( img => 
      {
        //console.log(img);
        this.cargarUsuarios()
      });
  }

  cargarUsuarios(){
    this.cargando = true;
    this.usuarioService.cargarUsuarios(this.desde)
    .subscribe(({total, usuarios}) => {
      this.totalUsuario = total;
      this.usuariosTemp = usuarios;
      this.usuarios = usuarios;
      this.cargando = false;
      //console.log(resp);
    })

  }

  cambiarPagina( valor: number ) {
    this.desde += valor;

    if( this.desde < 0 ){
      this.desde = 0;
    } else if( this.desde >= this.totalUsuario  ){
      this.desde -= valor;
    }

    this.cargarUsuarios();
  }

  buscar( termino: string){
    //console.log(termino);

    if( termino.length === 0){
      return this.usuarios = this.usuariosTemp;
      //return this.cargarUsuarios()

    }

    this.busquedasService.buscar( 'usuarios' , termino)
      .subscribe( resultados => {
        this.usuarios = resultados;
      });
  }

  eliminarUsuario( usuario: Usuario){
    //console.log(usuario);

    if( usuario.uid === this.usuarioService.uid ){
    
      return Swal.fire('Error' , 'No puede borrarse a si mismo' , 'error');

    }
    

    Swal.fire({
      title: 'Borrar usuario?',
      text:`Esa a punto de borrar a ! ${usuario.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Confirmado!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.eliminarUsuario( usuario)
          .subscribe( resp => {
            this.cargarUsuarios();
            Swal.fire(
              'Usuario borrado',
              `${ usuario.nombre} fue eliminado correctamente`,
              'success'
            );
          }, (err) => {
            //Si sucede algun error
            Swal.fire('Error' , err.error.msg, 'error');
          });
      }
    })
  }

  cambiarRole(usuario: Usuario){
    //console.log(usuario);
    this.usuarioService.guardarUsuario(usuario)
      .subscribe( resp => {
        console.log(resp);
      })


  }

  abrirModal(usuario:Usuario){
    //console.log(usuario);
    this.modalImagenService.abrirModal('usuarios', usuario.uid, usuario.imgUrl);
  }

}
