import { Injectable, inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { ObservablesService } from '../services/observables.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root'})
class PermissionsService {
  constructor( private observable:ObservablesService ) {
    this.observable.loginObs.subscribe();
  }

  puedeActivarLaRuta(rutaIngresada: any): boolean{
    //console.log(rutaIngresada);
    //console.log(this.observable.estado())
    if(rutaIngresada == 'pokemones') {
      //console.log(this.observable.estado())
      return this.observable.estado();
    } else {
      return true;
    }
  }

}

export const guardiaSesionGuard: CanActivateFn = (route, state) => {
  return inject(PermissionsService).puedeActivarLaRuta(route.url.toString());
};
