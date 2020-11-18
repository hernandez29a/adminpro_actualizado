import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

import { Hospital } from 'src/app/models/hospital.model';
import { Medico } from 'src/app/models/medico.model';

import { HospitalService } from 'src/app/services/hospital.service';
import { MedicoService } from 'src/app/services/medico.service';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [
  ]
})
export class MedicoComponent implements OnInit {

  public medicoForm: FormGroup;
  public hospitales: Hospital[] = [];

  public medico: Medico;

  public medicoSeleccionado: Medico;
  public hospitalSeleccionado: Hospital;

  constructor(private fb: FormBuilder,
              private hospitalService: HospitalService,
              private medicoService: MedicoService,
              private router: Router,
              private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.activateRoute.params.subscribe( ({id}) => {
      //console.log(id);
      
      this.cargarMedico(id);
    });

    //Declaramos los campos del formulario
    this.medicoForm = this.fb.group({
      nombre: ['', Validators.required],
      hospital: ['', Validators.required]
    });

    this.cargarTodosHospitales();

    this.medicoForm.get('hospital').valueChanges
      .subscribe( hospitalId => {
        //console.log(hospitalId);
        this.hospitalSeleccionado = this.hospitales.find( h => h._id === hospitalId );
        //console.log(this.hospitalSeleccionado);

      })
  }

  cargarMedico( id: string) {

    if( id === 'nuevo') {
      return;
    }

    this.medicoService.obtenerMedicoPorId( id )
      .pipe(
        delay(100)
      )
      .subscribe( (medico: any) => {

        if( !medico) {
          return this.router.navigateByUrl(`/dashboard/medicos`);
        }

        //console.log(this.medicoSeleccionado);
        const {nombre,hospital:{ _id}} = medico;
        //console.log(nombre, _id);
        this.medicoSeleccionado = medico;
        this.medicoForm.setValue({nombre, hospital:_id});
      })

  }

  cargarTodosHospitales(){

    this.hospitalService.cargarTodosHospitales()
      .subscribe( (resp:any) => {
        //console.log(resp);
        this.hospitales = resp.hospitales;
      });

  }

  guardarMedico() {
    const {nombre} = this.medicoForm.value;


    if( this.medicoSeleccionado ){
      // actualizar
      
      const data = {
        ...this.medicoForm.value,
        _id: this.medicoSeleccionado._id
      }
      //console.log(data);
      this.medicoService.actualizarMedicos( data )
      .subscribe( resp => {
          //console.log(resp);
          Swal.fire('Actualizado', `${nombre} actualizado correctamente` , 'success' );
        });

    } else {
      //crear
      //console.log(this.medicoForm.value);
  
      this.medicoService.crearMedicos(this.medicoForm.value)
        .subscribe( (resp: any) => {
          //console.log(resp);
          Swal.fire('Creado', `${nombre}` , 'success' );
          this.router.navigateByUrl(`/dashboard/medico/${resp.medico._id}`);
        });


    }


  }



}
