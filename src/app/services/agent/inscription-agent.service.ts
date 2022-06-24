import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class InscriptionAgentService {

  constructor(private http: HttpClient) { }
  SignAgent(data: any) { console.log("hhh ", data); return this.http.post("http://localhost:8080/agents", data) }
}
