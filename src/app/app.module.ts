import { JwtInterceptor } from './services/jwt.interceptor';
import { LoginAgentComponent } from './components/agent/login/login.component';
import { LoginAgencyComponent } from './components/agency/login/login.component';
import { InscriptionAgencyComponent } from './components/agency/inscription/inscription-agency.component';
import { InscriptionAgentComponent } from './components/agent/inscription/inscription-agent.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/partials/navbar/navbar.component';
import { PageNotFoundComponent } from './components/partials/page-not-found/page-not-found.component';
import { AcceuilComponent } from './components/acceuil/acceuil.component';
import { FooterComponent } from './components/partials/footer/footer.component';
import { HeaderComponent } from './components/partials/header/header.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AcceuilAgentComponent } from './components/agent/acceuil-agent/acceuil-agent.component';
import { AcceuilAgencyComponent } from './components/agency/acceuil-agency/acceuil-agency.component';
import { ColiesNotDelivredComponent } from './components/agent/colies-not-delivred/colies-not-delivred.component';
import { AgentsComponent } from './components/agency/agents/agents.component';
import { LotsComponent } from './components/agency/lots/lots.component';
import { ColiesComponent } from './components/agency/colies/colies.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DelivreAgentComponent } from './components/modals/agent/modal1/delivre-agent/delivre-agent.component';
import { NotAuthorizedPageComponent } from './components/partials/not-authorized-page/not-authorized-page.component';

@NgModule({
  declarations: [
    AppComponent,
    InscriptionAgentComponent,
    InscriptionAgencyComponent,
    LoginAgencyComponent,
    LoginAgentComponent,
    NavbarComponent,
    PageNotFoundComponent,
    AcceuilComponent,
    FooterComponent,
    HeaderComponent,
    AcceuilAgentComponent,
    AcceuilAgencyComponent,
    ColiesNotDelivredComponent,
    AgentsComponent,
    LotsComponent,
    ColiesComponent,
    DelivreAgentComponent,
    NotAuthorizedPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
