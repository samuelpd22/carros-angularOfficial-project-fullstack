import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Marca } from '../models/marca';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarcaService {

  //@Autowired
  http = inject(HttpClient); //FAZ REQUISIÇÕES

  API = "http://localhost:8080/api/marca";

  constructor() { }

  listAll(): Observable<Marca[]>{ //Metodo @GETMapping
    return this.http.get<Marca[]>(this.API+"/findAll");
  }

  findById(id:number): Observable<Marca>{ //Metodo @GetMapping
    return this.http.get<Marca>(this.API+"/findById/"+id  )//Retorno string? Sempre usar responseType

  }

  save(marca:Marca): Observable<string>{ //Metodo @PostMapping
    return this.http.post<string>(this.API+"/save",marca ,{ responseType: 'text' as 'json'})//Retorno string? Sempre usar responseType

  }
  //Passar como parametro CARRO e ID ,pois vão ser passados dois valores para o metodo Put, Id e objeto.
  update(marca: Marca,id:number): Observable<string>{ //Metodo @PutMapping
    return this.http.put<string>(this.API+"/update/"+id ,marca ,{ responseType: 'text' as 'json'})//Retorno string? Sempre usar responseType

  }





  delete(id : number): Observable<string>{ //Metodo @DeleteMapping
    return this.http.delete<string>(this.API+"/delete/"+id ,{ responseType: 'text' as 'json'})//Retorno string? Sempre usar responseType

  }
}
