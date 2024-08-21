import { Component, EventEmitter, inject, Output, TemplateRef, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { NewAcessoriosComponent } from '../new-acessorios/new-acessorios.component';
import { Acessorios } from '../../../models/acessorios';
import { AcessorioServiceService } from '../../../services/acessorio-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-acessorioslist',
  standalone: true,
  imports: [RouterLink, MdbModalModule, NewAcessoriosComponent],
  templateUrl: './acessorioslist.component.html',
  styleUrl: './acessorioslist.component.scss'
})
export class AcessorioslistComponent {

  lista: Acessorios[]=[];
  acessorioEdit: Acessorios = new Acessorios(0,"");

  //ELEMENTOS DE MODAL
  modalService = inject(MdbModalService); // Para conseguir abrir a MODAL
  @ViewChild("modalMarcaDetalhe") modelMarcaDetalhe!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;
  @Output("retorno") retorno = new EventEmitter<any>();

  //ELEMENTOS DE MODAL ^^^




  acessorioService = inject(AcessorioServiceService);//@Autowired


  constructor(){

   this.listAll();


    let acessorioNovo = history.state.acessorioNovo;
    let acessorioEditada = history.state.acessorioEditada;

    if(acessorioNovo){
      acessorioNovo.id = 555;
      this.lista.push(acessorioNovo);

    }
    if(acessorioEditada){
      let indice = this.lista.findIndex(x => {return x.id == acessorioEditada.id});
      this.lista[ indice ] = acessorioEditada;
    }

  }

  listAll(){          //ESTRUTURA PARA METODOD GET RETORNAR
    this.acessorioService.listAll().subscribe({
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



  deleteById(acessorio: Acessorios){
    Swal.fire({
      title:'Tem certeza que deseja deletar este registro?',
      icon:'warning',
      showConfirmButton:true,
      showDenyButton:true,
      confirmButtonText:' Sim',
      cancelButtonText:'Não',

    }).then((result) =>{
      if(result.isConfirmed){ //Clicou em OK! para deletar, vai fazer:


        this.acessorioService.delete(acessorio.id).subscribe({
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
    this.acessorioEdit = new Acessorios(0,"");
    this.modalRef = this.modalService.open(this.modelMarcaDetalhe);
  }
  edit(acessorio:Acessorios){
    this.acessorioEdit = Object.assign({}, acessorio);//CLOANDO PRA EVITAR REFERENCIA DE OBJETO
    this.modalRef = this.modalService.open(this.modelMarcaDetalhe);

  }


  retornoDetalhe(acessorio:Acessorios){
    this.listAll();
    this.modalRef.close();

  }


  selecionar(acessorio:Acessorios){
    this.retorno.emit(acessorio);
  }
}

