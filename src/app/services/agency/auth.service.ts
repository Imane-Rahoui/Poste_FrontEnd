import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  loginAgency(data: { email: string, password: string }) { return this.http.post("http://localhost:8080/agencies/login", data) }
}
