import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ModalManager } from 'ngb-modal';
import { Lots } from 'src/app/models/lots';
import { CreateLotService } from 'src/app/services/agency/create-lot.service';
import { DeleteLotService } from 'src/app/services/agency/delete-lot.service';
import { ListLotsService } from 'src/app/services/agency/list-lots.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-lots',
  templateUrl: './lots.component.html',
  styleUrls: ['./lots.component.css'],
})
export class LotsComponent implements OnInit {
  constructor(
    private tokenService: TokenService,
    config: NgbModalConfig,
    private modalService: NgbModal,
    private modalManager: ModalManager,
    private listLotsService: ListLotsService,
    private deleteLotService: DeleteLotService,
    private createLotService: CreateLotService
  ) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
  }

  formLotC = new FormGroup({
    nameLot: new FormControl(null, Validators.required),
    street: new FormControl(null, Validators.required),
  });

  lotId = null;
  lots: Lots[] = [];
  private modalRef = {};
  flag: boolean = false;
  agencyEmail = null;

  getAllLots() {
    this.listLotsService.ListLots(this.agencyEmail).subscribe((res: any) => {
      this.lots = res;
      console.log('lots:', this.lots);
      this.lots.length != 0 ? (this.flag = true) : (this.flag = false);
    });
  }

  testCapacity(mc: any) {
    if (mc == 100) return false; return true;
  }

  open(content: any, id: any) {
    this.lotId = id;
    console.log('id lot', this.lotId);
    this.modalRef = this.modalService.open(content);
  }

  deleteLot() {
    this.deleteLotService.deleteLot(this.lotId).subscribe((res: any) => {
      console.log('delete FCT ', res);
      window.location.reload();
    });
    this.close();
    console.log('yes confirm ');
  }

  close() {
    this.modalManager.close(this.modalRef);
    console.log('yes closed');
    this.lotId = null;
  }

  createLot() {
    this.createLotService.createLot(this.formLotC.value, this.agencyEmail).subscribe((res: any) => {
      window.location.reload();
      this.close();
    });
  }

  ngOnInit(): void {
    this.agencyEmail = this.tokenService.getEmail();
    this.getAllLots();
  }
}
