import { TokenService } from './../../../services/token.service';
import { ListColiesService } from './../../../services/agent/list-colies.service';
import { Component, OnInit } from '@angular/core';
import { Colies } from 'src/app/models/colies';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalManager } from 'ngb-modal';
import { DelivreColieService } from 'src/app/services/agent/delivre-colie.service';

@Component({
  selector: 'app-colies-not-delivred',
  templateUrl: './colies-not-delivred.component.html',
  styleUrls: ['./colies-not-delivred.component.css'],
  providers: [NgbModalConfig, NgbModal],
})
export class ColiesNotDelivredComponent implements OnInit {
  constructor(
    private coliesND: ListColiesService,
    private tokenService: TokenService,
    config: NgbModalConfig,
    private modalService: NgbModal,
    private modalManager: ModalManager,
    private delivreColieService: DelivreColieService
  ) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
  }
  colieId = null;
  colies: Colies[] = [];
  ngOnInit(): void {
    this.getAllColiesND();
  }
  getAllColiesND() {
    this.coliesND
      .getAllNotDelivred(this.tokenService.getEmail())
      .subscribe((res: any) => (this.colies = res));
  }
  private modalRef = {};
  open(content: any, id: any) {
    this.colieId = id;
    this.modalRef = this.modalService.open(content);
    console.log(this.modalRef);
  }

  close() {
    this.modalManager.close(this.modalRef);
    console.log('yes closed');
    this.colieId = null;
  }

  confirm() {
    this.delivreColieService.Delivre(this.colieId).subscribe((res: any) => {
      console.log('nadi ', res);
    });
    window.location.reload();
    this.modalManager.close(this.modalRef);
    console.log('yes confirm ');
  }
}
