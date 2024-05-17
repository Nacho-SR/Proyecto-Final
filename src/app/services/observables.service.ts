import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ObservablesService {
  constructor(private router:Router) {}

  private login$ = new BehaviorSubject<boolean>(false);
  public loginObs = this.login$.asObservable();

  validar(email:string, password:string):void{
    if((email == 'isalas30@hotmail.com') && (password == '123456')){
      this.actualizarObs(true);
      console.log(this.estado());
      this.router.navigate(['/pokemones']);
    } else {
      this.actualizarObs(false);
    }
  }

  actualizarObs(valor:boolean):void{
    this.login$.next(valor);
  }

  estado(): boolean {
    return this.login$.getValue();
  }

}
