import { Component, OnDestroy } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';


@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnDestroy {

  public titulo: string;
  public tituloSubs$: Subscription;

  constructor(private router: Router) {

    this.tituloSubs$ = this.getArgumentoRuta()
      .subscribe(({ titulo }) => {
        //aqui obtenemos el titulo de la pagina 
        //console.log(titulo);
        this.titulo = titulo;
        //colocar el titulo a la pestaña del navegador
        document.title = `AdminPro - ${titulo}`;
      });

  }

  ngOnDestroy(): void {
      this.tituloSubs$.unsubscribe();
  }



  getArgumentoRuta() {

    return this.router.events
      .pipe(
        filter(event => event instanceof ActivationEnd),
        filter((event: ActivationEnd) => event.snapshot.firstChild === null),
        map((event: ActivationEnd) => event.snapshot.data)
      );

  }


}
