import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DelivreColieService {

  constructor(private http: HttpClient) { }

  Delivre(id: any) { console.log("rak katdelivrer " + `http://localhost:8080/agents/colies/${id}`); return this.http.put(`http://localhost:8080/agents/colies/${id}`, id) }

}
