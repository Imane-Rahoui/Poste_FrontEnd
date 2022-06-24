import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ListLotsService {

  constructor(private http: HttpClient) { }
  ListLots(email: any) { return this.http.get("http://localhost:8080/agencies/lots", email) }

}
