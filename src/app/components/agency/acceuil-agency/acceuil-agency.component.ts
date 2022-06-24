import { AgencySignUp } from './../../../models/agency-sign-up';
import { Component, OnInit } from '@angular/core';
import { CurrentAgencyService } from 'src/app/services/agency/current-agency.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-acceuil-agency',
  templateUrl: './acceuil-agency.component.html',
  styleUrls: ['./acceuil-agency.component.css'],
})
export class AcceuilAgencyComponent implements OnInit {
  constructor(
    private currentAgencyService: CurrentAgencyService,
    private tokenService: TokenService
  ) { }
  agency: AgencySignUp = {
    agencyId: "",
    name: "",
    email: "",
    password: "",
    city: "",
    mobile: "",
    country: "",
    street: "",
    postal: ""
  }

  ngOnInit(): void {
    this.getAgencyInfos();
  }
  getAgencyInfos() {
    this.currentAgencyService
      .currentAgency(this.tokenService.getEmail())
      .subscribe((res: any) => { (this.agency = res); console.log(this.agency) });
  } print() { console.log(this.agency) }
}
