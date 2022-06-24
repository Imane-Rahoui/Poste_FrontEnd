import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DeleteColieService {

  constructor(private http: HttpClient) { }

  deleteColie(id: any) { return this.http.delete(`http://localhost:8080/agencies/colie/${id}`) }
}
