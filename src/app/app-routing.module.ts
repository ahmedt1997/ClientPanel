import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {AddClientComponent} from './components/add-client/add-client.component';
import {EditClientComponent} from './components/edit-client/edit-client.component';
import {DetailsClientComponent} from './components/details-client/details-client.component';
import {SettingsClientComponent} from './components/settings-client/settings-client.component';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {AuthGuardsGuard} from './guards/auth-guards.guard';

const routes: Routes = [
  {
    path:"",
    component:DashboardComponent , canActivate:[AuthGuardsGuard]
  },
  {
    path:"Login",
    component:LoginComponent
  },
  {
    path:"Register",
    component:RegisterComponent
  },
  {
    path:"Client/Add",
    component:AddClientComponent , canActivate:[AuthGuardsGuard]
  },
  {
    path:"Client/Edit/:id",
    component:EditClientComponent , canActivate:[AuthGuardsGuard]
  },
  {
    path:"Client/:id",
    component:DetailsClientComponent , canActivate:[AuthGuardsGuard]
  },
  {
    path:"settings",
    component:SettingsClientComponent , canActivate:[AuthGuardsGuard]
  },
  {
    path:"**",
    component:NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[AuthGuardsGuard]
})
export class AppRoutingModule { }
