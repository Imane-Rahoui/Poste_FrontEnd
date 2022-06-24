import { TokenService } from './../../../services/token.service';
import { InscriptionAgentService } from './../../../services/agent/inscription-agent.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ListAgencyService } from 'src/app/services/agency/list-agency.service';
import { ModalManager } from 'ngb-modal';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/agent/auth.service';

@Component({
  selector: 'app-inscription-agent',
  templateUrl: './inscription-agent.component.html',
  styleUrls: ['./inscription-agent.component.css'],
})
export class InscriptionAgentComponent implements OnInit {
  fake = {
    email: 'test@gmail.com',
    password: 'Touriamama1',
  };

  login() {
    this.authService.loginAgent(this.fake).subscribe((res) => {
      console.log(this.fake);
      this.tokenService.handle(res);
    });
  }

  flag: boolean = false;
  list: any;
  signUp = new FormGroup({
    cin: new FormControl(null, Validators.required),
    firstName: new FormControl(null, Validators.required),
    lastName: new FormControl(null, Validators.required),
    city: new FormControl(null, Validators.required),
    mobile: new FormControl(null, Validators.required),
    country: new FormControl(null, Validators.required),
    street: new FormControl(null, Validators.required),
    nameAgency: new FormControl(null, Validators.required),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(20),
    ]),
  });
  constructor(
    private authService: AuthService,
    private router: Router,
    private inscriptionAgent: InscriptionAgentService,
    private listAgencyService: ListAgencyService,
    private tokenService: TokenService,
    config: NgbModalConfig,
    private modalService: NgbModal,
    private modalManager: ModalManager
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }
  private modalRef = {};
  signUpFct() {
    this.inscriptionAgent
      .SignAgent(this.signUp.value)
      .subscribe((res) => this.handleResponse(res));
  }
  fakeToken(data: any) {
    this.tokenService.handle(data);
  }
  ngOnInit(): void {
    console.log('naaaa', this.list);
    this.flag = false;
    this.login();
    console.log(this.signUp); this.connected = false;
  }
  agencies() {
    this.listAgencyService.ListAgency().subscribe((res: any) => {
      this.list = res;
      console.log('hh ', this.list);
    });
  }
  connected: any;
  fctconnected() { if (this.connected == false && this.tokenService.isAgent()) { this.agencies(); this.connected = true; return true; } return true }
  handleResponse(res: any) {
    this.flag = true;
    console.log(this.signUp);
    this.reset();
    this.tokenService.remove();
  }
  reset() {
    let val;
    if (this.flag == true) {
      this.signUp.value.cin = null;
      this.signUp.value.lastName = null;
      this.signUp.value.firstName = null;
      this.signUp.value.city = null;
      this.signUp.value.street = null;
      this.signUp.value.country = null;
      this.signUp.value.nameAgency = 'none';
      this.signUp.value.mobile = null;
      this.signUp.value.email = null;
      this.signUp.value.password = null;
    }
  }
  open(content: any) {
    this.modalRef = this.modalService.open(content, { scrollable: true });
  }
  close() {
    this.modalManager.close(this.modalRef);
  }
}
