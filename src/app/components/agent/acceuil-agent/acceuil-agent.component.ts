import { TokenService } from './../../../services/token.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-acceuil-agent',
  templateUrl: './acceuil-agent.component.html',
  styleUrls: ['./acceuil-agent.component.css'],
})
export class AcceuilAgentComponent implements OnInit {
  constructor(private token: TokenService) { }

  ngOnInit(): void {
    console.log('tok ', this.token.getToken());
    console.log('id ', this.token.getId());
  }
}
