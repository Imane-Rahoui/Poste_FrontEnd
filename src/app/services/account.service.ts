import { TokenService } from './token.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private loggedIn = new BehaviorSubject<boolean>(this.tokenService.loggedIn())

  authStatus = this.loggedIn.asObservable();

  constructor(private tokenService: TokenService) { }

  changeStatus(value: boolean) { this.loggedIn.next(value) }
}
