import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfirmAgentService {

  constructor(private http: HttpClient) { }

  confirm(id: any) { console.log("rak katconfirmer " + `http://localhost:8080/agencies/agent/${id}`); return this.http.put(`http://localhost:8080/agencies/agent/${id}`, id) }

}
