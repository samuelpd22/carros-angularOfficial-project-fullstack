import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Carro } from '../models/carro';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarroService {

  //@Autowired
  http = inject(HttpClient); //FAZ REQUISIÇÕES

  API = "http://localhost:8080/api/carro";

  constructor() { }

  listAll(): Observable<Carro[]>{ //Metodo @GETMapping
    return this.http.get<Carro[]>(this.API+"/findAll");
  }


  delete(id : number): Observable<string>{ //Metodo @DeleteMapping
    return this.http.delete<string>(this.API+"/delete/"+id ,{ responseType: 'text' as 'json'})//Retorno string? Sempre usar responseType

  }
}
