import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Lots } from './../../../models/lots';
import { ListLotsService } from './../../../services/agency/list-lots.service';
import { AgentSignUp } from './../../../models/agent-sign-up';
import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ModalManager } from 'ngb-modal';
import { TokenService } from 'src/app/services/token.service';
import { AgentsService } from 'src/app/services/agency/agents.service';
import { ConfirmAgentService } from 'src/app/services/agency/confirm-agent.service';
import { DeleteAgentService } from 'src/app/services/agency/delete-agent.service';
import { AffecterLotService } from 'src/app/services/agency/affecter-lot.service';

@Component({
  selector: 'app-agents',
  templateUrl: './agents.component.html',
  styleUrls: ['./agents.component.css'],
  providers: [NgbModalConfig, NgbModal],
})
export class AgentsComponent implements OnInit {
  constructor(
    private tokenService: TokenService,
    config: NgbModalConfig,
    private modalService: NgbModal,
    private modalManager: ModalManager,
    private confirmAgentService: ConfirmAgentService,
    private agentsService: AgentsService,
    private deleteAgentService: DeleteAgentService,
    private listLotsService: ListLotsService,
    private affecterLotService: AffecterLotService
  ) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
  }
  list: any;
  formLot = new FormGroup({
    lot: new FormControl(null),
  });
  agencyEmail = null;
  agentId = null;
  agentName = { firstName: '', lastName: '' };
  lots: Lots[] = [];
  agents: AgentSignUp[] = [];
  private modalRef = {};
  last() {
    this.formLot.value.lot = this.lots[this.lots.length - 1].lotId;
  }
  ngOnInit(): void {
    this.getAllAgents();
    this.agencyEmail = this.tokenService.getEmail();
    this.getAllLots();
  }
  testConfirmed(c: any) {
    if (c == null) return false;
    return true;
  }
  testLot(l: any) {
    if (l == "Aucun") return false;
    return true;
  }
  affecterLot() {
    console.log("aiiiii")
    if (this.formLot.value.lot == null) this.last();
    console.log('hi', this.formLot.value.lot);
    console.log(this.agentName.firstName + ' waaa');
    this.affecterLotService
      .affecter(this.agentName, this.formLot.value.lot)
      .subscribe((res: any) => {
        window.location.reload();
        this.close();
      });
  }
  getAllLots() {
    this.listLotsService.ListLots(this.agencyEmail).subscribe((res: any) => {
      this.lots = res;
      this.lots.length == 0 ? (this.flagL = true) : (this.flagL = false);
    });
  }
  getAllAgents() {
    this.agentsService
      .getAllAgents(this.tokenService.getEmail())
      .subscribe((res: any) => {
        this.agents = res;
        console.log('agents:', this.flag);
        this.agents.length != 0 ? (this.flag = true) : (this.flag = false);
      });
  }

  flag: boolean = false;
  flagL: boolean = false;

  open(content: any, id: any) {
    this.agentId = id;
    this.modalRef = this.modalService.open(content);
    console.log(this.modalRef);
  }

  openLot(content: any, fname: any, lname: any) {
    this.agentName.firstName = fname;
    this.agentName.lastName = lname;
    console.log(this.agentName.firstName, '  ho  ', this.agentName.lastName);
    this.modalRef = this.modalService.open(content);
    console.log(this.modalRef);
  }

  confirmAgent() {
    this.confirmAgentService.confirm(this.agentId).subscribe((res: any) => {
      console.log('oulala ', res);
    });
    window.location.reload();
    this.close();
    console.log('yes confirm ');
  }

  deleteAgent() {
    this.deleteAgentService.deleteAgent(this.agentId).subscribe((res: any) => {
      console.log('delete FCT ', res);
    });
    window.location.reload();
    this.close();
    console.log('yes confirm ');
  }

  close() {
    this.modalManager.close(this.modalRef);
    console.log('yes closed');
    this.agentId = null;
  }
}
