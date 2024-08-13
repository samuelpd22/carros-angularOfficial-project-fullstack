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

  findById(id:number): Observable<Carro>{ //Metodo @GetMapping
    return this.http.get<Carro>(this.API+"/findById/"+id  )//Retorno string? Sempre usar responseType

  }

  save(carro:Carro): Observable<string>{ //Metodo @PostMapping
    return this.http.post<string>(this.API+"/save",carro ,{ responseType: 'text' as 'json'})//Retorno string? Sempre usar responseType

  }
  //Passar como parametro CARRO e ID ,pois vão ser passados dois valores para o metodo Put, Id e objeto.
  update(carro: Carro,id:number): Observable<string>{ //Metodo @PutMapping
    return this.http.put<string>(this.API+"/update/"+id ,carro ,{ responseType: 'text' as 'json'})//Retorno string? Sempre usar responseType

  }





  delete(id : number): Observable<string>{ //Metodo @DeleteMapping
    return this.http.delete<string>(this.API+"/delete/"+id ,{ responseType: 'text' as 'json'})//Retorno string? Sempre usar responseType

  }
}
