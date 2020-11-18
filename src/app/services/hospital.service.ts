import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { CargarHospital } from '../interfaces/cargar.hospitales.interface';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor(private http: HttpClient) { }

  //obtenemos el token del local storage
  get token(): string{
    return localStorage.getItem('token') || '';
  }


  //colocamos el token en el header, para las 
  //peticiones necesarias
  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  cargarHospitales( desde: number = 0){

    const url = `${base_url}/hospitales?desde=${desde}`;
    return this.http.get<CargarHospital>( url, this.headers );
    /*
      .pipe(
        map(resp => {
          //console.log(resp);
          const usuarios = resp.usuarios.map(
             user => new Usuario(user.nombre, user.email, '' , user.google, user.imgUrl, user.role, user.uid ) 
             )
          return {
            total:resp.total,
            usuarios
          };
        })
      )*/

  }

  cargarTodosHospitales( desde: number = 0){

    const url = `${base_url}/hospitales/todosHospitales`;
    return this.http.get<CargarHospital>( url, this.headers );
  }


  crearHospitales( nombre: string){

    const url = `${base_url}/hospitales`;
    return this.http.post( url, { nombre }, this.headers );
   
  }

  actualizarHospitales( _id: string, nombre: string){

    const url = `${base_url}/hospitales/${_id}`;
    return this.http.put( url, { nombre }, this.headers );
   
  }

  borrarHospitales( _id: string){

    const url = `${base_url}/hospitales/${_id}`;
    return this.http.delete( url, this.headers );
   
  }



}
