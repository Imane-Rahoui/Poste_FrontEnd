import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ListColiesService {

  constructor(private http: HttpClient) { }
  getAllNotDelivred(email: any) { return this.http.get(`${environment.apiUrl}/agents/colies`, email) }
}
