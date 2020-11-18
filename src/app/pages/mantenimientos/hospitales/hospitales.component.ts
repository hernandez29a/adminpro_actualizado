import { Component, OnDestroy, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { HospitalService } from '../../../services/hospital.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { BusquedasService } from 'src/app/services/busquedas.service';

import { Hospital } from '../../../models/hospital.model';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit, OnDestroy {

  public totalHospitales : number = 0;
  public hospitales: Hospital[] = [];
  public hospitalesTemp: Hospital[] = [];
  
  public desde: number = 0;
  public cargando: boolean = true;
  private imgSubs: Subscription;


  constructor(private hospitalService: HospitalService,
              private busquedasService: BusquedasService,
              private modalImagenService: ModalImagenService) { }
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarHospitales();
    this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(
        delay(1000)
      )
     .subscribe( img => 
      {
        //console.log(img);
        this.cargarHospitales()
      });
  }

  cargarHospitales(){
    this.cargando = true;
    this.hospitalService.cargarHospitales( this.desde)
      .subscribe( ({total, hospitales}) => {
        //console.log(hospitales);
        this.totalHospitales = total;
        this.hospitales = hospitales;
        this.cargando = false;
      });
  }

  cambiarPagina( valor: number ) {
    this.desde += valor;

    if( this.desde < 0 ){
      this.desde = 0;
    } else if( this.desde >= this.totalHospitales  ){
      this.desde -= valor;
    }

    this.cargarHospitales();
  }

  buscar( termino: string){
    //console.log(termino);

    if( termino.length === 0){
      return this.cargarHospitales();
      //return this.hospitales = this.hospitalesTemp;

    }

    this.busquedasService.buscar( 'hospitales' , termino)
      .subscribe( resultados => {
        this.hospitales = resultados;
      });
  }

  guardarCambios(hospital: Hospital) {
      console.log(hospital);
      this.hospitalService.actualizarHospitales(hospital._id, hospital.nombre)
        .subscribe( resp => {
          Swal.fire('Actualizado', hospital.nombre, 'success');
        });
  }

  eliminarHospital(hospital: Hospital) {
    //console.log(hospital);
    this.hospitalService.borrarHospitales(hospital._id)
      .subscribe( resp => {
        this.cargarHospitales();
        Swal.fire('Eliminado', hospital.nombre, 'success');
      });
}


 async abrirSweetAlert(){
  const {value = ''} = await Swal.fire<string>({
    title: 'Crear Hospital',
    text:'Ingrese el nombre del nuevo Hospital',
    input: 'text',
    inputPlaceholder: 'Nombre del Hospital',
    showCancelButton: true
  });

  //console.log(value);
  if( value.trim().length > 0 ){
    this.hospitalService.crearHospitales( value)
      .subscribe( (resp:any) => {
        //console.log(resp);
        //this.hospitales.( resp.hospital)
        this.cargarHospitales();
      });
  }
  
}

abrirModal(hospital: Hospital){

   //console.log(usuario);
   this.modalImagenService.abrirModal('hospitales', hospital._id, hospital.imgUrl);

}

}
