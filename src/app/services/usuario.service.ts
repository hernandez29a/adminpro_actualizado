import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';


import { environment } from '../../environments/environment';




import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';
import { CargarUsuario } from '../interfaces/cargar-usuarios.interface';

import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';

const base_url = environment.base_url

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public usuario: Usuario;

  constructor( private http: HttpClient,
              private router: Router) { }

  get token(): string{
    return localStorage.getItem('token') || '';
  }

  get role(): string {
    return this.usuario.role;
  }

  get uid(): string{
    return this.usuario.uid || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  guardarLocalStorage( token: string, menu: any) {

    localStorage.setItem('token', token );
    localStorage.setItem('menu',JSON.stringify (menu) );

  }

  logout(){

    //TODO Borrar Menu
    localStorage.removeItem('token');
    localStorage.removeItem('menu');
    this.router.navigateByUrl('/login');
  }

  validarToken(): Observable<boolean>{
    

    return this.http.get(`${base_url}/login/renew` , {
      headers: {
        'x-token': this.token
      }
    }).pipe(
      map((resp: any) => {
        //ver los datos del usuario logeado
        //console.log(resp);
        const { nombre, email, google, imgUrl, public_id, role, uid } = resp.usuario;
        this.usuario = new Usuario(nombre, email, '' , google, imgUrl, public_id, role, uid );

       this.guardarLocalStorage( resp.token, resp.menu );
        return true;
      }),
      
      catchError(error => of(false))
    );

  }

  crearUsuario(formData: RegisterForm ){
    //console.log('creando usuario');

    return this.http.post(`${base_url}/usuarios`, formData)
    .pipe(
      tap(  (resp: any) => {
        this.guardarLocalStorage( resp.token, resp.menu );
        //console.log(resp)
      })
    );

  }

  actualizarPerfil(data:{ email:string, nombre: string, role: string}){
    data = {
      ...data,
      role: this.usuario.role
    }

    return this.http.put(`${base_url}/usuarios/${this.uid}`, data, this.headers );

  }

  

  login(formData: LoginForm ){
    //console.log('creando usuario');

    return this.http.post(`${base_url}/login`, formData)
      .pipe(
        tap(  (resp: any) => {
          this.guardarLocalStorage( resp.token, resp.menu );
          //console.log(resp)
        })
      );

  }

  cargarUsuarios( desde: number = 0){

    const url = `${base_url}/usuarios?desde=${desde}`;
    return this.http.get<CargarUsuario>( url, this.headers );
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

  eliminarUsuario( usuario: Usuario){
    console.log('eliminado');

    // /usuarios/id del usuario
    const url = `${base_url}/usuarios/${usuario.uid}`;
    return this.http.delete( url, this.headers );
  }

  guardarUsuario(usuario: Usuario){

    return this.http.put(`${base_url}/usuarios/${usuario.uid}`, usuario, this.headers );

  }

  
}
