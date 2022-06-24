import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CreateColieService {

  constructor(private http: HttpClient) { }

  createColie(data: any, email: any) {
    return this.http.post("http://localhost:8080/agencies/colie", data, email)
  }
}
