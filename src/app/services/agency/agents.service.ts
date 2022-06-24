import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AgentsService {

  constructor(private http: HttpClient) { }

  getAllAgents(email: any) { return this.http.get(`${environment.apiUrl}/agencies/agents/all`, email) }

}
