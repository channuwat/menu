import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }

  setStore(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getStore(key: string) {
    let store: any = localStorage.getItem(key) ?? null
    return JSON.parse(store)
  }

  copy(value: any) {
    return JSON.parse(JSON.stringify(value))
  }
}
