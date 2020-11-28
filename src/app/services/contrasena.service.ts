import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario.model';
import { UsuarioService } from './usuario.service';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ContrasenaService {

  public uid: string;
  public token : string;

  constructor( private http: HttpClient,
               private router: Router,
               private usuarioService: UsuarioService) { }

  get token1(): string{
    return localStorage.getItem('token') || '';
  }


    reestablecerContrasena( usuario:Usuario ) {

      //console.log(usuario);
       this.token = usuario.codigo

      return this.http.put(`${base_url}/resetPass`, usuario, {
        headers: {
          'x-token': this.token
        }
      });
    }

    actualizarContrasena( data:{password_old: string, password_new: string} ) {

      


      data = {
        ...data
      }
      this.uid = this.usuarioService.uid;

      console.log(data);
      console.log(this.uid);

      return this.http.put(`${base_url}/resetPass/actualizar/${this.uid}`, data, {
        headers: {
          'x-token': this.token1
        }
      });

    }
}
