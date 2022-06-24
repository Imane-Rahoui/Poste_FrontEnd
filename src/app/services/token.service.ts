import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor() { }

  set(data: any) {
    localStorage.setItem('token', data.token);
    localStorage.setItem('id', data.id);
  }

  handle(data: any) {
    this.set(data);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getId() {
    return localStorage.getItem('id');
  }

  remove() {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
  }

  decode(payload: any) {
    return JSON.parse(atob(payload)); //ascii to binary
  }

  payload(token: any) {
    const payload = token.split('.')[1];
    console.log('payload : ', payload);
    return this.decode(payload);
  }

  isValid() {
    const token = this.getToken();
    const id = this.getId();
    if (token) {
      console.log('kayn token');
      const payload = this.payload(token);
      if (payload) {
        return id == payload.id;
      }
    }
    console.log('makaynsh token');
    return false;
  }
  isAgent() {
    const token = this.getToken();
    const id = this.getId();
    if (token) {
      console.log('kayn token');
      const payload = this.payload(token);
      if (payload) {
        if (payload.type == 'agent') return true;
      }
    }
    console.log('makaynsh token');
    return false;
  }
  NotAvaiable() {
    const token = this.getToken();
    const id = this.getId();
    if (token) {
      const payload = this.payload(token);
      if (payload) {
        if (payload.sub == 'test@gmail.com') {
          this.remove()
          console.log('maendksh lhek');
          return true;
        }
      }
    }
    return false;
  }
  getEmail() {
    const token = this.getToken();
    if (token) {
      console.log('kayn token');
      const payload = this.payload(token);
      if (payload) {
        return payload ? payload.sub : null;
      }
    }
    console.log('makaynsh token');
    return null;
  }

  getInfos() {
    const token = this.getToken();
    if (token) {
      const payload = this.payload(token);
      return payload ? payload : null;
    }
    return null;
  }

  loggedIn() {
    console.log('loggedin : ', this.isValid());
    return this.isValid();
  }
}
