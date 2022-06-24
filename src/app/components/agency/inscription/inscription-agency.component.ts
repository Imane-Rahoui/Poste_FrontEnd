import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ModalManager } from 'ngb-modal';
import { AuthService } from 'src/app/services/agency/auth.service';
import { InscriptionAgenceService } from 'src/app/services/agency/inscription-agence.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-inscription-agency',
  templateUrl: './inscription-agency.component.html',
  styleUrls: ['./inscription-agency.component.css'],
})
export class InscriptionAgencyComponent implements OnInit {
  flag: boolean = false;

  fake = {
    email: 'test@gmail.com',
    password: 'Touriamama1',
  };
  login() {
    this.authService.loginAgency(this.fake).subscribe((res) => {
      console.log(this.fake);
      this.tokenService.handle(res);
    });
  }

  signUp = new FormGroup({
    cin: new FormControl(null, Validators.required),
    name: new FormControl(null, Validators.required),
    city: new FormControl(null, Validators.required),
    mobile: new FormControl(null, Validators.required),
    country: new FormControl(null, Validators.required),
    street: new FormControl(null, Validators.required),
    postal: new FormControl(null, Validators.required),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(20),
    ]),
  });
  constructor(private authService: AuthService,
    config: NgbModalConfig,
    private modalService: NgbModal,
    private modalManager: ModalManager,
    private router: Router,
    private inscriptionAgency: InscriptionAgenceService,
    private tokenService: TokenService
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }
  private modalRef = {};

  signUpFct() {
    this.inscriptionAgency
      .SignAgency(this.signUp.value)
      .subscribe((res) => this.handleResponse(res));
  }
  fakeToken(data: any) {
    this.tokenService.handle(data);
  }
  ngOnInit(): void {
    this.flag = false;
    this.login();
    console.log(this.signUp);
  }
  handleResponse(res: any) {
    this.flag = true;
    console.log(this.signUp);
    this.tokenService.remove();
    this.reset();
  }
  reset() {
    let val;
    if (this.flag == true) {
      this.signUp.value.cin = null;
      this.signUp.value.name = null;
      this.signUp.value.city = null;
      this.signUp.value.street = null;
      this.signUp.value.country = null;
      this.signUp.value.mobile = null;
      this.signUp.value.email = null;
      this.signUp.value.password = null;
      this.signUp.value.postal = null;
    }
  }
  print() {
    console.log(this.signUp);
  }
  open(content: any) {
    this.modalRef = this.modalService.open(content, { scrollable: true });
  }
  close() {
    this.modalManager.close(this.modalRef);
  }
}
