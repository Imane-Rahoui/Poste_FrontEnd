import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DeleteLotService {

  constructor(private http: HttpClient) { }

  deleteLot(id: any) { console.log("delete lot" + `http://localhost:8080/agencies/lot/${id}`); return this.http.delete(`http://localhost:8080/agencies/lot/${id}`) }

}
