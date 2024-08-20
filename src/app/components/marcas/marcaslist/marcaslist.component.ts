
import { Component, EventEmitter, inject, Input, Output, TemplateRef, ViewChild, viewChild } from '@angular/core';
import { Carro } from '../../../models/carro';
import { RouterLink } from '@angular/router';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { MarcasdetailsComponent } from "../marcasdetails/marcasdetails.component";
import Swal from 'sweetalert2';
import { MarcaService } from '../../../services/marca.service';
import { Marca } from '../../../models/marca';


@Component({
  selector: 'app-marcaslist',
  standalone: true,
  imports: [RouterLink, MdbModalModule, MarcasdetailsComponent,MarcasdetailsComponent],
  templateUrl: './marcaslist.component.html',
  styleUrl: './marcaslist.component.scss'
})
export class MarcaslistComponent {

  lista: Marca[]=[];
  marcaEdit: Marca = new Marca(0,"");

  //ELEMENTOS DE MODAL
  modalService = inject(MdbModalService); // Para conseguir abrir a MODAL
  @ViewChild("modalMarcaDetalhe") modelMarcaDetalhe!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;
  @Output("retorno") retorno = new EventEmitter<any>();

  //ELEMENTOS DE MODAL ^^^

  @Input("esconderBotoes") esconderBotoes:boolean = false;


  marcaService = inject(MarcaService);//@Autowired


  constructor(){

   this.listAll();


    let marcaNovo = history.state.marcaNovo;
    let marcaEditada = history.state.marcaEditada;

    if(marcaNovo){
      marcaNovo.id = 555;
      this.lista.push(marcaNovo);

    }
    if(marcaEditada){
      let indice = this.lista.findIndex(x => {return x.id == marcaEditada.id});
      this.lista[ indice ] = marcaEditada;
    }

  }

  listAll(){          //ESTRUTURA PARA METODOD GET RETORNAR
    this.marcaService.listAll().subscribe({
      next:lista => { //QUANDO DER CERTO
        this.lista = lista;

      },
      error: err => { //QUANDO OCORRER ERRO
        Swal.fire({   //EXIBE MENSAGEL
          title:"Ocorreu um erro",
          icon:'error',
          confirmButtonText: 'Ok'
        });
      },
    });
  }



  deleteById(marca: Marca){
    Swal.fire({
      title:'Tem certeza que deseja deletar este registro?',
      icon:'warning',
      showConfirmButton:true,
      showDenyButton:true,
      confirmButtonText:' Sim',
      cancelButtonText:'Não',

    }).then((result) =>{
      if(result.isConfirmed){ //Clicou em OK! para deletar, vai fazer:


        this.marcaService.delete(marca.id).subscribe({
          next:message => { //QUANDO DER CERTO
            Swal.fire({   //EXIBE MENSAGEL
              title:message, //PEGA MENSAGEL DO MEU BACKEND , No endpoint Delete
              icon:'success',
              confirmButtonText: 'Ok'
            });
            this.listAll();
          },
          error: err => { //QUANDO OCORRER ERRO
            Swal.fire({   //EXIBE MENSAGEL
              title:"Ocorreu um erro",
              icon:'error',
              confirmButtonText: 'Ok'
            });
          },
        });


      }
    })

  }

  new(){
    this.marcaEdit = new Marca(0,"");
    this.modalRef = this.modalService.open(this.modelMarcaDetalhe);
  }
  edit(marca:Marca){
    this.marcaEdit = Object.assign({}, marca);//CLOANDO PRA EVITAR REFERENCIA DE OBJETO
    this.modalRef = this.modalService.open(this.modelMarcaDetalhe);

  }


  retornoDetalhe(marca:Marca){
    this.listAll();
    this.modalRef.close();

  }


  selecionar(marca:Marca){
    this.retorno.emit(marca);
  }
}
