import { Lots } from 'src/app/models/lots';
import { Colies } from 'src/app/models/colies';
import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ModalManager } from 'ngb-modal';
import { ListColieService } from 'src/app/services/agency/list-colie.service';
import { ListLotsService } from 'src/app/services/agency/list-lots.service';
import { TokenService } from 'src/app/services/token.service';
import { DeleteColieService } from 'src/app/services/agency/delete-colie.service';
import { CreateColieService } from 'src/app/services/agency/create-colie.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-colies',
  templateUrl: './colies.component.html',
  styleUrls: ['./colies.component.css'],
})
export class ColiesComponent implements OnInit {
  constructor(
    private tokenService: TokenService,
    config: NgbModalConfig,
    private listLotsService: ListLotsService,
    private modalService: NgbModal,
    private modalManager: ModalManager,
    private listColieAgencyService: ListColieService,
    private deleteColieService: DeleteColieService,
    private createColieService: CreateColieService
  ) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;

  }
  disponibilite: boolean = false;
  SearchColie = new FormGroup({
    cin: new FormControl(null),
  })

  formCC = new FormGroup({
    nameLot: new FormControl(null, Validators.required),
    cinSender: new FormControl(null, Validators.required),
    firstNameSender: new FormControl(null, Validators.required),
    lastNameSender: new FormControl(null, Validators.required),
    streetSender: new FormControl(null, Validators.required),
    mobileSender: new FormControl(null, Validators.required),
    emailSender: new FormControl(null, Validators.required),
    cinRecipient: new FormControl(null, Validators.required),
    firstNameRecipient: new FormControl(null, Validators.required),
    lastNameRecipient: new FormControl(null, Validators.required),
    countryRecipient: new FormControl(null, Validators.required),
    cityRecipient: new FormControl(null, Validators.required),
    streetRecipient: new FormControl(null, Validators.required),
    mobileRecipient: new FormControl(null, Validators.required),
    emailRecipient: new FormControl('nada'),
  });

  lots: Lots[] = [];
  colies: Colies[] = [];
  agencyEmail = null;
  private modalRef = {};
  flag: boolean = false;
  colieId = null;
  getAllLots() {
    this.listLotsService.ListLots(this.agencyEmail).subscribe((res: any) => {
      this.lots = res;
      console.log('lots:', this.lots);
    });
  }
  lotsDispo(c: any) {
    console.log("hh", c)
    if (c == '0') {
      this.disponibilite = true; console.log("ok", c)
      return true;
    }
    return false;
  }
  getAllColies() {
    this.listColieAgencyService
      .getAllColiesAgency(this.agencyEmail)
      .subscribe((res: any) => {
        this.colies = res;
        console.log('colies g:', this.flag);
        this.colies.length != 0 ? (this.flag = true) : (this.flag = false);
      });
  }
  data = { email: null, cin: "" };
  getColiesByCin() {

    this.data.email = this.agencyEmail;

    this.data.cin = this.SearchColie.getRawValue()['cin'];
    console.log("lol", this.data)

    this.listColieAgencyService
      .getColiesAgencyByCin(this.data)
      .subscribe((res: any) => {
        this.colies = res;
        console.log('colies g:', this.flag);
        this.colies.length != 0 ? (this.flag = true) : (this.flag = false);
      });
  }
  ngOnInit(): void {
    this.agencyEmail = this.tokenService.getEmail();
    this.getAllColies();
    this.getAllLots();
  }

  open(content: any, id: any) {
    this.colieId = id;
    console.log('id colie', this.colieId);
    this.modalRef = this.modalService.open(content);
  }
  close() {
    this.modalManager.close(this.modalRef);
    console.log('yes closed');
    this.colieId = null;
  }
  deleteColie() {
    this.deleteColieService.deleteColie(this.colieId).subscribe((res: any) => {
      console.log('delete FCT ', res);
      window.location.reload();
    });
    this.close();
    console.log('yes confirm ');
  }
  createColie() {
    if (this.formCC.value.nameLot == null) this.last();

    this.createColieService
      .createColie(this.formCC.value, this.agencyEmail)
      .subscribe((res: any) => {
        window.location.reload();
        this.close();
      });
    console.log('ccccc', this.formCC.value);
  }
  last() {
    this.formCC.value.nameLot = this.lots[this.lots.length - 1].nameLot;
  }
}
