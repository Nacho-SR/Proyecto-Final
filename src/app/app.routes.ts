import { Routes } from '@angular/router';
import { BodyComponent } from './components/app-body/body/body.component';
import { PokemonesComponent } from './components/app-pokemones/pokemones/pokemones.component';
import { guardiaSesionGuard } from './guard/guardia.guard'

export const routes: Routes = [
  { path:'', redirectTo:'/login', pathMatch:'full' },
  { path: 'login', component: BodyComponent, canActivate:[guardiaSesionGuard] },
  { path: 'pokemones', component: PokemonesComponent, canActivate:[guardiaSesionGuard] }
];
