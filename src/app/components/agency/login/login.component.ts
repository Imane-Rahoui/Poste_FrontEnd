import { AccountService } from '../../../services/account.service';
import { TokenService } from './../../../services/token.service';
import { AuthService } from './../../../services/agency/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginAgencyComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(20),
    ]),
  });
  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
    private router: Router,
    private accountService: AccountService
  ) { }
  login() {
    this.authService
      .loginAgency(this.loginForm.value)
      .subscribe((res) => this.handleResponse(res));
  }
  ngOnInit(): void {
  }
  handleResponse(res: any) {
    this.tokenService.handle(res);
    this.accountService.changeStatus(true);
    this.router.navigateByUrl('/agency/acceuil');
  }
}
