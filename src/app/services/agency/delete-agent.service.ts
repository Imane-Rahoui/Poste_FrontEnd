import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DeleteAgentService {

  constructor(private http: HttpClient) { }

  deleteAgent(id: any) { console.log("delete " + `http://localhost:8080/agencies/agent/${id}`); return this.http.delete(`http://localhost:8080/agencies/agent/${id}`) }
}
