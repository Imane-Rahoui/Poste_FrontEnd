import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ListColieService {

  constructor(private http: HttpClient) { }
  getAllColiesAgency(email: any) { return this.http.get(`${environment.apiUrl}/agencies/colies`, email) }
  getColiesAgencyByCin(data: any) { console.log("ylh", data); return this.http.get(`${environment.apiUrl}/agencies/colies/${data.cin}`, data.email) }

}
