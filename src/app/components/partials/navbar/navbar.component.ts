import { AccountService } from '../../../services/account.service';
import { Router } from '@angular/router';
import { TokenService } from './../../../services/token.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(
    private accountService: AccountService,
    private tokenService: TokenService,
    private router: Router
  ) { }
  currentUser: any = null;

  logOut() {
    if (this.tokenService.isAgent() == true)
      this.router.navigateByUrl('/agent/login');
    else this.router.navigateByUrl('/agency/login');
    this.accountService.changeStatus(false);
    this.tokenService.remove();
  }

  ngOnInit(): void {
    this.accountService.authStatus.subscribe((res) => {
      this.currentUser = this.tokenService.getInfos();
      console.log(this.currentUser);
      console.log(this.tokenService.isAgent());
    });
  }
  currentUserFct() {
    if (this.tokenService.isAgent()) return true;
    else return false;
  }
}
