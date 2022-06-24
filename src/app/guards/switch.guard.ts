import { AccountService } from './../services/account.service';
import { TokenService } from './../services/token.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SwitchGuard implements CanActivate {
  constructor(private tokenService: TokenService, private accountService: AccountService, private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    this.tokenService.NotAvaiable()
    if (this.tokenService.loggedIn()) {
      if (this.tokenService.isAgent() == true)
        this.router.navigateByUrl("/agent/acceuil")
      else
        this.router.navigateByUrl("/not-authorized-page")
      return false;
    }
    return true;
  }

}
