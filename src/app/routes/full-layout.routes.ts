import { Routes } from '@angular/router';
import { LoginComponent } from '../components/login/login.component';

//Rutas para contenido que ocupen todo el ancho de la pantalla, por ejemplo el login
export const FULL_ROUTES: Routes = [
  { path: 'login', component: LoginComponent },
];