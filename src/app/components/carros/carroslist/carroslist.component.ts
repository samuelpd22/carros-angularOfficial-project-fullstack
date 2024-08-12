import { Component, inject, TemplateRef, ViewChild, viewChild } from '@angular/core';
import { Carro } from '../../../models/carro';
import { RouterLink } from '@angular/router';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { CarrosdetailsComponent } from "../carrosdetails/carrosdetails.component";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-carroslist',
  standalone: true,
  imports: [RouterLink, MdbModalModule, CarrosdetailsComponent,CarrosdetailsComponent],
  templateUrl: './carroslist.component.html',
  styleUrl: './carroslist.component.scss'
})
export class CarroslistComponent {
  lista: Carro[]=[];
  carroEdit: Carro = new Carro(0,"");

  //ELEMENTOS DE MODAL
  modalService = inject(MdbModalService); // Para conseguir abrir a MODAL
  @ViewChild("modalCarroDetalhe") modelCarroDetalhe!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;
  //ELEMENTOS DE MODAL ^^^






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
    Swal.fire({
      title:'Tem certeza que deseja deletar este registro?',
      icon:'warning',
      showConfirmButton:true,
      showDenyButton:true,
      confirmButtonText:' Sim',
      cancelButtonText:'Não',

    }).then((result) =>{
      if(result.isConfirmed){
        let indice = this.lista.findIndex(x => {return x.id == Carro.id})
        this.lista.splice(indice, 1);


        Swal.fire({
          title:'Deletado com sucesso!',
          icon:'success',
          confirmButtonText: 'Ok'
        });

      }
    })

  }

  new(){
    this.carroEdit = new Carro(0,"");
    this.modalRef = this.modalService.open(this.modelCarroDetalhe);
  }
  edit(carro:Carro){
    this.carroEdit = Object.assign({}, carro);//CLOANDO PRA EVITAR REFERENCIA DE OBJETO
    this.modalRef = this.modalService.open(this.modelCarroDetalhe);

  }


  retornoDetalhe(carro:Carro){
    if(carro.id > 0){
      let indice = this.lista.findIndex( x => { return x.id == carro.id});
      this.lista[indice] = carro;
    } else {
      carro.id=55;
      this.lista.push(carro)
    }



    this.modalRef.close();
  }

}
