import { Component, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs';

export interface PokeData {
  name: any;
  url: any;
};

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':'application/json',
  })
};

@Injectable({
  providedIn: 'root',
})

export class ObtenerDatosService {
  private pokemonList$ = new BehaviorSubject<[PokeData]>([{ name: '', url: ''}]);
  public listaPokeObs = this.pokemonList$.asObservable();

  private pokemon$ = new BehaviorSubject<PokeData>({ name: '', url: ''});
  public pokeObs = this.pokemon$.asObservable();

  constructor(private http: HttpClient) {}

  actualizarListObs(valor:[PokeData]):void{
    this.pokemonList$.next(valor);
  }

  listaPokemones(): PokeData {
    return this.pokemon$.getValue();
  }

  getListPokemon(url:string):void{
    this.http.get(url, httpOptions)
      .subscribe( (items:any) => {
        this.actualizarListObs(items.results);
      });
  }

  listaValue(): [PokeData] {
    return this.pokemonList$.getValue();
  }

  /*getUrl(url:string):void{
    this.liga = url;
  }*/

  getObs(url: string): Observable<object> {
    return this.http.get(url, httpOptions);
  }

}
