import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Acessorios } from '../models/acessorios';

@Injectable({
  providedIn: 'root'
})
export class AcessorioServiceService {

  //@Autowired
  http = inject(HttpClient); //FAZ REQUISIÇÕES

  API = "http://localhost:8080/api/acessorio";

  constructor() { }

  listAll(): Observable<Acessorios[]>{ //Metodo @GETMapping
    return this.http.get<Acessorios[]>(this.API+"/findAll");
  }

  findById(id:number): Observable<Acessorios>{ //Metodo @GetMapping
    return this.http.get<Acessorios>(this.API+"/findById/"+id  )//Retorno string? Sempre usar responseType

  }

  save(acessorio:Acessorios): Observable<string>{ //Metodo @PostMapping
    return this.http.post<string>(this.API+"/save",acessorio ,{ responseType: 'text' as 'json'})//Retorno string? Sempre usar responseType

  }
  //Passar como parametro CARRO e ID ,pois vão ser passados dois valores para o metodo Put, Id e objeto.
  update(acessorio: Acessorios,id:number): Observable<string>{ //Metodo @PutMapping
    return this.http.put<string>(this.API+"/update/"+id ,acessorio ,{ responseType: 'text' as 'json'})//Retorno string? Sempre usar responseType

  }





  delete(id : number): Observable<string>{ //Metodo @DeleteMapping
    return this.http.delete<string>(this.API+"/delete/"+id ,{ responseType: 'text' as 'json'})//Retorno string? Sempre usar responseType

  }
}
