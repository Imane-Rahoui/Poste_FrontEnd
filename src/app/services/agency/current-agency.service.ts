import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CurrentAgencyService {

  constructor(private http: HttpClient) { }
  currentAgency(email: any) { return this.http.get("http://localhost:8080/agencies/agency", email) }
}
