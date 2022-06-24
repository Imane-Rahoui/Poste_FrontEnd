import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ListAgencyService {

  constructor(private http: HttpClient) { }
  ListAgency() { return this.http.get("http://localhost:8080/agencies"); }
}
