import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  public menu = [];

  cargarMenu() {
    this.menu = JSON.parse( localStorage.getItem('menu') ) || [];
    //console.log(this.menu);

  }

 /* menu: any[] = [
    {
      titulo: 'Dashboard',
      icono: 'mdi mdi-gauge',
      submenu: [
        {titulo: 'Inicio',url: '/' },
        {titulo: 'Conductores',url: '/' },
        {titulo: 'Buses',url: '/' },
        {titulo: 'Taller',url: '/' },
        {titulo: 'Rutas',url: '/' },
      ]
    },

    {
      titulo: 'Mantenimiento',
      icono: 'mdi mdi-folder-lock-open',
      submenu: [
        {titulo: 'Usuario',url: 'usuarios' },
        {titulo: 'Hospitales',url: 'hospitales' },
        {titulo: 'Médicos',url: 'medicos' },
      ]
    },
  ]:*/


}
