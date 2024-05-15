import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BodyComponent } from './components/app-body/body/body.component';
import { HeaderComponent } from './components/app-header/header/header.component';
import { FooterComponent } from './components/app-footer/footer/footer.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import { ObservablesService } from './services/observables.service';
import { ObtenerDatosService } from './services/obtener-datos.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, BodyComponent, FooterComponent, RouterOutlet, MatGridListModule, MatCardModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  valores:any[]=[];
  checkoutForm: any;
  hide= true;
  loader:boolean = false;

  constructor(private obtenerDatosService: ObtenerDatosService,private formBuilder: FormBuilder, private observablesService:ObservablesService ){
    this.checkoutForm = this.formBuilder.group({
      name: new FormControl(null, [Validators.minLength(1)]),
      url: new FormControl(null,[Validators.maxLength(2)]),
      email: new FormControl(null,[Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)])
    });

  }
  ngOnInit(): void {
    this.observablesService.loaderObs.subscribe((valor:boolean) => {
      this.loader=valor;
      console.log(valor);
    });
  }

  onSubmit(valorFormulario:any): void {
    if((this.checkoutForm.invalid) || (this.checkoutForm.get('name').value == 'angular')){
      alert('Formulario incorrecto');
    }else {
      this.valores.push(valorFormulario);
      this.checkoutForm.reset();
    }
  }
  title = 'Proyecto_Final';
}
