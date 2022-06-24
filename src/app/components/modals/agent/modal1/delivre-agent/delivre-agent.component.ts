import { Component, OnInit } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalManager } from 'ngb-modal';

@Component({
  selector: 'app-delivre-agent',
  templateUrl: './delivre-agent.component.html',
  styleUrls: ['./delivre-agent.component.css'],
  // add NgbModalConfig and NgbModal to the component providers
  providers: [NgbModalConfig, NgbModal]
})
export class DelivreAgentComponent implements OnInit {

  constructor(config: NgbModalConfig, private modalService: NgbModal, private modalManager: ModalManager) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
  }
  private modalRef = {};
  open(content: any) {
    this.modalRef = this.modalService.open(content); console.log(this.modalRef)
  }

  close() {
    this.modalManager.close(this.modalRef);
    console.log('yes closed');
  }

  ngOnInit(): void {
  }

}
