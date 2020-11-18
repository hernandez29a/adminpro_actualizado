import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Medico } from 'src/app/models/medico.model';

import { BusquedasService } from 'src/app/services/busquedas.service';
import { MedicoService } from 'src/app/services/medico.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit , OnDestroy  {

  public totalMedicos : number = 0;
  public medicos: Medico[] = [];
  

  public desde: number = 0;
  public cargando: boolean = true;
  private imgSubs: Subscription;

  constructor(private medicoService: MedicoService,
              private busquedasService: BusquedasService,
              private modalImagenService: ModalImagenService) { }
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarMedicos();
    this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(
        delay(1000)
      )
     .subscribe( img => 
      {
        //console.log(img);
        this.cargarMedicos()
      });
  }

  cargarMedicos(){
    this.cargando = true;
    this.medicoService.cargarMedicos( this.desde)
      .subscribe ( ({total, medicos}) => {
        //console.log(medicos);
        this.totalMedicos = total;
        this.medicos = medicos;
        this.cargando = false;
      });

  }

  borrarMedico(medico: Medico){

    Swal.fire({
      title: 'Borrar usuario?',
      text:`Esa a punto de borrar a! ${medico.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Confirmado!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.medicoService.eliminarMedicos( medico._id)
          .subscribe( resp => {
            this.cargarMedicos();
            Swal.fire(
              'Médico borrado',
              `${ medico.nombre} fue eliminado correctamente`,
              'success'
            );
          }, (err) => {
            //Si sucede algun error
            Swal.fire('Error' , err.error.msg, 'error');
          });
      }
    })


  }

  cambiarPagina( valor: number ) {
    this.desde += valor;

    if( this.desde < 0 ){
      this.desde = 0;
    } else if( this.desde >= this.totalMedicos  ){
      this.desde -= valor;
    }

    this.cargarMedicos();
  }

  buscar( termino: string){
    //console.log(termino);

    if( termino.length === 0){
      return this.cargarMedicos();
      //return this.hospitales = this.hospitalesTemp;

    }

    this.busquedasService.buscar( 'medicos' , termino)
      .subscribe( resultados => {
        this.medicos = resultados;
      });
  }

  abrirModal(medico: Medico){

    //console.log(usuario);
    this.modalImagenService.abrirModal('medicos', medico._id, medico.imgUrl);
 
 }

}
