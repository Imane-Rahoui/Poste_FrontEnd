import { DelivreAgentComponent } from './components/modals/agent/modal1/delivre-agent/delivre-agent.component';
import { ColiesComponent } from './components/agency/colies/colies.component';
import { LotsComponent } from './components/agency/lots/lots.component';
import { AgentsComponent } from './components/agency/agents/agents.component';
import { AuthGuard } from './guards/auth.guard';
import { AcceuilComponent } from './components/acceuil/acceuil.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InscriptionAgencyComponent } from './components/agency/inscription/inscription-agency.component';
import { LoginAgencyComponent } from './components/agency/login/login.component';
import { InscriptionAgentComponent } from './components/agent/inscription/inscription-agent.component';
import { LoginAgentComponent } from './components/agent/login/login.component';
import { PageNotFoundComponent } from './components/partials/page-not-found/page-not-found.component';
import { AcceuilAgentComponent } from './components/agent/acceuil-agent/acceuil-agent.component';
import { AcceuilAgencyComponent } from './components/agency/acceuil-agency/acceuil-agency.component';
import { AfterAuthGuard } from './guards/after-auth.guard';
import { ItsAgentGuard } from './guards/its-agent.guard';
import { ItsAgencyGuard } from './guards/its-agency.guard';
import { NotAuthorizedPageComponent } from './components/partials/not-authorized-page/not-authorized-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/acceuil', pathMatch: 'full' },
  { path: 'acceuil', component: AcceuilComponent },
  { path: 'test', component: DelivreAgentComponent },
  {
    path: 'agency',
    children: [
      {
        path: 'sign-up',
        component: InscriptionAgencyComponent,
        canActivate: [AfterAuthGuard],
      },
      {
        path: 'login',
        component: LoginAgencyComponent,
        canActivate: [AfterAuthGuard],
      },
      {
        path: 'acceuil',
        component: AcceuilAgencyComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'agents',
        component: AgentsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'lots',
        component: LotsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'colies',
        component: ColiesComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
  {
    path: 'agent',
    children: [
      {
        path: 'sign-up',
        component: InscriptionAgentComponent,
        canActivate: [ItsAgentGuard],
      },
      {
        path: 'login',
        component: LoginAgentComponent,
        canActivate: [ItsAgentGuard],
      },
      {
        path: 'acceuil',
        component: AcceuilAgentComponent,
        canActivate: [ItsAgencyGuard],
      },

      //{ path: "delivred/colie", component: AddAddressComponent },
    ],
  },
  { path: 'not-authorized-page', component: NotAuthorizedPageComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
