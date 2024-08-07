import { Routes } from '@angular/router';
import { LoginComponent } from './components/layout/login/login.component';
import { PrincipalComponent } from './components/layout/principal/principal.component';
import { CarroslistComponent } from './components/carros/carroslist/carroslist.component';
import { CarrosdetailsComponent } from './components/carros/carrosdetails/carrosdetails.component';

export const routes: Routes = [
  {path:"",redirectTo:"login", pathMatch:"full"},
  {path:"login", component: LoginComponent},
  {path:"admin",component:PrincipalComponent, children: [ //Rota filha, tudo que estiver aqui, será renderizado apos o /admin
    {path:"carros",component:CarroslistComponent},
    {path:"carros/new", component:CarrosdetailsComponent},
    {path:"carros/edit/:id",component:CarrosdetailsComponent}

  ]}
];
