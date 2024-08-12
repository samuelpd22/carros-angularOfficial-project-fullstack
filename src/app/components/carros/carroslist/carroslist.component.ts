import { Component } from '@angular/core';
import { Carro } from '../../../models/carro';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-carroslist',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './carroslist.component.html',
  styleUrl: './carroslist.component.scss'
})
export class CarroslistComponent {


  lista: Carro[]=[];

  constructor(){

    this.lista.push(new Carro(1, 'Fiesta'));
    this.lista.push(new Carro(2, 'i30'));
    this.lista.push(new Carro(3, 'Corolla'));
    this.lista.push(new Carro(4, 'Civic'));


    let carroNovo = history.state.carroNovo;
    let carroEditado = history.state.carroEditado;

    if(carroNovo){
      carroNovo.id = 555;
      this.lista.push(carroNovo);

    }
    if(carroEditado){
      let indice = this.lista.findIndex(x => {return x.id == carroEditado.id});
      this.lista[ indice ] = carroEditado;
    }

  }

  deleteById(Carro: Carro){
    if(confirm("Tem certeza que deseja deletar este registro?") ){
    let indice = this.lista.findIndex(x => {return x.id == Carro.id})
    this.lista.splice(indice, 1);
    }
  }

}
