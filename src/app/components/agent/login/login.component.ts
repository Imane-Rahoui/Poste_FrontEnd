import { Router } from '@angular/router';
import { TokenService } from './../../../services/token.service';
import { AuthService } from './../../../services/agent/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginAgentComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(8), Validators.maxLength(20)]),
  })
  constructor(private authService: AuthService, private tokenService: TokenService, private router: Router) { }
  login() {
    this.authService.loginAgent(this.loginForm.value).subscribe(res => this.handleResponse(res))
  }
  ngOnInit(): void {
  } myData: any;
  handleResponse(res: any) {
    this.myData = res;
    console.log("haaaaa:", res)
    console.log(this.myData)
    this.tokenService.handle(res);
    this.router.navigateByUrl("/agent/acceuil");
  }

}
