import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BodyComponent } from './components/app-body/body/body.component';
import { HeaderComponent } from './components/app-header/header/header.component';
import { FooterComponent } from './components/app-footer/footer/footer.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { ObservablesService } from './services/observables.service';
import { ObtenerDatosService } from './services/obtener-datos.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {merge} from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, BodyComponent, FooterComponent, RouterOutlet, MatGridListModule,
    MatCardModule, CommonModule, MatFormFieldModule, MatInputModule,
    MatButtonModule, MatIconModule, FormsModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  valores:any[]=[];
  checkoutForm: any;
  inicio = true;
  hide= true;
  errorMessage = '';
  title = 'Proyecto_Final';


  constructor(private obtenerDatosService: ObtenerDatosService,private formBuilder: FormBuilder, private observablesService:ObservablesService ){
    this.checkoutForm = this.formBuilder.group({
      email : new FormControl('', [Validators.required, Validators.email]),
      password : new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {

  }

  getPokemon():void {
    this.obtenerDatosService.getPokemon('https://pokeapi.co/api/v2/pokemon').subscribe(
      (items:any) => {
        this.valores=items.results[0];
        console.log(this.valores);
      }
    )
  }

  onSubmit(valorFormulario:any): void {
    if((this.checkoutForm.invalid) || (this.checkoutForm.get('name').value == 'angular')){
      alert('Usuario o contraseña incorrecto');
    }else {
      this.valores.push(valorFormulario);
      this.checkoutForm.reset();
    }
  }

  

  

  /*merge(this.email.statusChanges, this.email.valueChanges)
        .pipe(takeUntilDestroyed())
        .subscribe(() => this.updateErrorMessage());

  updateErrorMessage() {
    if (this.email.hasError('required')) {
      this.errorMessage = 'Campo requerido';
    } else if (this.email.hasError('email')) {
      this.errorMessage = 'Email no valido';
    } else {
      this.errorMessage = '';
    }
  }*/

}
