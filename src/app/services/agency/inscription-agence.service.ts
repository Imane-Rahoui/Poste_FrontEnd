import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InscriptionAgenceService {

  constructor(private http: HttpClient) { }
  SignAgency(data: any) { console.log("hhh ", data); return this.http.post("http://localhost:8080/agencies", data) }
}
