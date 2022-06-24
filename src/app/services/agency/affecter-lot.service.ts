import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AffecterLotService {

  constructor(private http: HttpClient) { }
  affecter(agent: {}, id: any) { console.log("rak kataffecter " + `http://localhost:8080/agencies/lot/${id}`); return this.http.put(`http://localhost:8080/agencies/lot/${id}`, agent) }

}
