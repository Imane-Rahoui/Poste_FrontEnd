import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CreateLotService {

  constructor(private http: HttpClient) { }

  createLot(data: any, email: any) {
    return this.http.post("http://localhost:8080/agencies/lot", data, email)
  }
}
