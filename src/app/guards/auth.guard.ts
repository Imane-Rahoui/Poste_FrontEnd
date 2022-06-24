import { AccountService } from '../services/account.service';
import { TokenService } from './../services/token.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private tokenService: TokenService, private accountService: AccountService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    this.tokenService.NotAvaiable(); console.log('wa ta fen')

    if (!this.tokenService.loggedIn()) {
      console.log('rak mdecooo')
      this.tokenService.remove();
      this.accountService.changeStatus(false);
      this.router.navigateByUrl("/acceuil")
      return false;
    }
    if (this.tokenService.isAgent()) {
      this.router.navigateByUrl("/agent/acceuil")
      return false;
    }
    return true;
  }

}
