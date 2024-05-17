import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatGridListModule } from '@angular/material/grid-list';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {merge} from 'rxjs';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import { ObtenerDatosService } from '../../../services/obtener-datos.service';
import { ObservablesService } from '../../../services/observables.service';


@Component({
  selector: 'app-body',
  standalone: true,
  imports: [RouterOutlet, MatGridListModule,
    MatCardModule, CommonModule, MatFormFieldModule, MatInputModule,
    MatButtonModule, MatIconModule, FormsModule, ReactiveFormsModule,
    RouterLink],
  templateUrl: './body.component.html',
  styleUrl: './body.component.css'
})
export class BodyComponent implements OnInit {
  valores:any[]=[];
  checkoutForm: any;
  inicio = true;
  hide= true;
  errorMessage = '';
  title = 'Proyecto_Final';


  constructor(private obtenerDatosService: ObtenerDatosService,private formBuilder: FormBuilder,
    private observablesService:ObservablesService){
    this.checkoutForm = this.formBuilder.group({
      email : new FormControl('', [Validators.required, Validators.email]),
      password : new FormControl('', [Validators.required])
    });
    
  }
  ngOnInit(): void {
    this.observablesService.loginObs.subscribe();
  }
  /*canActivate(valorFormulario:any): boolean {
    if(!(this.checkoutForm.invalid) && (this.checkoutForm.get('email').value == 'isalas30@hotmail.com') && (this.checkoutForm.get('password').value == '123456')){
      this.valores.push(valorFormulario);
      console.log(valorFormulario);
      this.checkoutForm.reset();
      return true;
    }else if(this.checkoutForm.invalid){
      alert('Formulario incorrecto');
      return false;
    }else {
      alert('Correo o contraseña incorrectos');
      return false;
    }
  }
  }*/

  onSubmit(valorFormulario:any): void {
    this.observablesService.validar(this.checkoutForm.get('email').value, this.checkoutForm.get('password').value);
    if (this.checkoutForm.invalid){
      this.checkoutForm.reset();
      this.observablesService.actualizarObs(false);
      alert('Formulario incorrecto');
    }else if (!this.observablesService.estado()){
      alert('Usuario o contraseña incorrectos');
    }
  }
}
