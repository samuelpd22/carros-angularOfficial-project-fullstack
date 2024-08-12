import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Carro } from '../models/carro';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarroService {

  http = inject(HttpClient); //FAZ REQUISIÇÕES

  API = "http://localhost:8080/api/carro";

  constructor() { }

  listAll(): Observable<Carro[]>{
    return this.http.get<Carro[]>(this.API+"/findAll");
  }
}
