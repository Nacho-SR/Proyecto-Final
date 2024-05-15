import { Component } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {FormControl, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {merge} from 'rxjs';

@Component({
  selector: 'app-body',
  standalone: true,
  imports: [MatGridListModule, MatCardModule, MatFormFieldModule, MatInputModule,
    MatButtonModule, MatIconModule, FormsModule, ReactiveFormsModule],
  templateUrl: './body.component.html',
  styleUrl: './body.component.css'
})
export class BodyComponent {
  hide= true;
  email = new FormControl('', [Validators.required, Validators.email]);

  errorMessage = '';

  constructor() {
    merge(this.email.statusChanges, this.email.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }

  updateErrorMessage() {
    if (this.email.hasError('required')) {
      this.errorMessage = 'Campo requerido';
    } else if (this.email.hasError('email')) {
      this.errorMessage = 'Email no valido';
    } else {
      this.errorMessage = '';
    }
  }
}
