import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BodyComponent } from './components/app-body/body/body.component';
import { HeaderComponent } from './components/app-header/header/header.component';
import { FooterComponent } from './components/app-footer/footer/footer.component';
import {merge} from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, BodyComponent, FooterComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent{
 
}
