import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatGridList } from '@angular/material/grid-list';
import { RouterOutlet } from '@angular/router';
import { MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { ObtenerDatosService } from '../../../services/obtener-datos.service';


export interface PokeData {
  name: any;
  url: any;
}
export interface Pokemon {
  id: string;
  name: string;
  url: string;
}

@Component({
  selector: 'app-pokemones',
  standalone: true,
  imports: [RouterOutlet, MatGridList, MatFormFieldModule, MatInputModule, MatTableModule,
    MatSortModule, MatPaginatorModule],
  templateUrl: './pokemones.component.html',
  styleUrl: './pokemones.component.css'
})
export class PokemonesComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['ID', 'Nombre', 'URL'];
  dataSource!: MatTableDataSource<Pokemon>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  private pokeTeam: [PokeData] = [{name: '', url: ''}];

  constructor(private obtenerDatosService:ObtenerDatosService) {
    //const pokemones = Array.from({length: 20}, (_, k) => this.createNewPoke(k + 1));
  }
  ngOnInit(): void {
    this.obtenerDatosService.listaPokeObs.subscribe();
    this.obtenerDatosService.getObs('https://pokeapi.co/api/v2/pokemon')
      .subscribe(
        (items:any) => {
          console.log(items.results);
          this.pokeTeam = items.results;
          console.log(this.pokeTeam);
          this.obtenerDatosService.actualizarListObs(items.results);
          console.log(this.obtenerDatosService.listaValue());
          //this.obtenerDatosService.actualizarListObs(items);
        });
    //this.obtenerDatosService.actualizarListObs([{name:'desde el init',url:'nana'}]);
    //this.getPokemon();
    //console.log(this.obtenerDatosService.listaValue());
    //this.getPokemon();
    // Create 20 pokemones
    const pokemones = Array.from({length: 20}, (_, k) => this.createNewPoke(k + 1));

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(pokemones);
  }

  ngAfterViewInit() {
    
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getPokemon(): void {
    this.obtenerDatosService.getListPokemon('https://pokeapi.co/api/v2/pokemon/');
    console.log(this.obtenerDatosService.listaValue());
    this.pokeTeam = this.obtenerDatosService.listaValue();
    console.log(this.pokeTeam);
  }

  createNewPoke(id: number): Pokemon {
    console.log(this.pokeTeam);
    const poke:PokeData = this.pokeTeam[id];
    const name =poke.name;
    const url =poke.url;
      //NAMES[Math.round(Math.random() * (NAMES.length - 1))] +
      //' ' +
      //NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) +
      //'.';
    return {
      id: id.toString(),
      name: name,
      url: url,
    };
  }
}
