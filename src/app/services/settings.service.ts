import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private linkTheme = document.querySelector('#theme');

  constructor() { 
    //console.log('Settings Service init');

     // ./assets/css/colors/default-dark.css
    const url = localStorage.getItem('theme') || './assets/css/colors/default-dark.css'  ; 
    this.linkTheme.setAttribute('href', url);
  }

  changeTheme( theme:string){
    //console.log(theme);

    const url = `./assets/css/colors/${theme}.css`;
    
    //verificamos la ruta con el color para el tema
    //console.log(url);

    this.linkTheme.setAttribute('href', url);
   
    //guardar la ruta en el local  Storaga
    localStorage.setItem('theme', url);

    this.checkCurrentTheme();
  }

  checkCurrentTheme(){

     const links = document.querySelectorAll('.selector');

    //console.log(links);
    links.forEach( elem => {

      elem.classList.remove('working');
      const btnTheme = elem.getAttribute('data-theme');
      const btnThemeUrl = `./assets/css/colors/${btnTheme}.css`;
      const currentTheme = this.linkTheme.getAttribute('href');
      
      if( btnThemeUrl === currentTheme){
        elem.classList.add('working');

      }

    });

  }
}
