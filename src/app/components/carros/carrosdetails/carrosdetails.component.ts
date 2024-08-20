import { Component,  EventEmitter,  inject, Input, Output, output, TemplateRef, ViewChild } from '@angular/core';
import { MdbFormsModule, } from 'mdb-angular-ui-kit/forms';
import { FormsModule } from '@angular/forms';
import { Carro } from '../../../models/carro';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CarroService } from '../../../services/carro.service';
import { MarcaslistComponent } from "../../marcas/marcaslist/marcaslist.component";
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { Marca } from '../../../models/marca';

@Component({
  selector: 'app-carrosdetails',
  standalone: true,
  imports: [MdbFormsModule, FormsModule, MarcaslistComponent,MarcaslistComponent],
  templateUrl: './carrosdetails.component.html',
  styleUrl: './carrosdetails.component.scss'
})
export class CarrosdetailsComponent {

  carroService = inject(CarroService);//@Autowired

  //ELEMENTOS DE MODAL
  modalService = inject(MdbModalService); // Para conseguir abrir a MODAL
  @ViewChild("modalMarcas") modalMarcas!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;
  //ELEMENTOS DE MODAL ^^^


    @Input("carro") carro:Carro = new Carro(0,'',null);
    @Output("retorno") retorno = new EventEmitter<any>();
    router = inject(ActivatedRoute);
    router2 = inject(Router);

    constructor(){
      let id = this.router.snapshot.params['id']; //Pega o ID que veio por parametro na ROTA HTTP
      if(id > 0){
        this.findById(id)
      }
    }

    findById(id:number){
      //busca back-end

      this.carroService.findById(id).subscribe({
        next: retorno => {
          this.carro = retorno;
        },
        error: erro => {
          Swal.fire({   //EXIBE MENSAGEL
            title:"Ocorreu um erro",
            icon:'error',
            confirmButtonText: 'Ok'
          });
        }
      })
    }

      //__________________________________________________________________________________________________________________//
      // Editar
    save(){
      if(this.carro.id > 0){

        this.carroService.update(this.carro, this.carro.id).subscribe({ //UPDATE
          next: mensagem => {
            Swal.fire({   //EXIBE MENSAGEM
              title:mensagem,
              icon:'success',
              confirmButtonText: 'Ok'
            });
            this.router2.navigate(['admin/carros'], { state:{ carroEditado: this.carro} });
            this.retorno.emit(this.carro);
          },
          error: erro => {
            Swal.fire({   //EXIBE MENSAGEM
              title:"Ocorreu um erro",
              icon:'error',
              confirmButtonText: 'Ok'
            });
          }
        })


      //__________________________________________________________________________________________________________________//
      // Salvar
      } else {


        this.carroService.save(this.carro).subscribe({ //SALVAR
          next: mensagem => {
            Swal.fire({   //EXIBE MENSAGEM
              title:mensagem,
              icon:'success',
              confirmButtonText: 'Ok'
            });
             //FECHAR MODAL
            this.router2.navigate(['admin/carros'], { state:{ carroNovo: this.carro} });
            this.retorno.emit(this.carro);
          },
          error: erro => {
            Swal.fire({   //EXIBE MENSAGEL
              title:"Ocorreu um erro",
              icon:'error',
              confirmButtonText: 'Ok'
            });
          }
        });


        //FECHAR MODAL
        this.router2.navigate(['admin/carros'], { state:{ carroNovo: this.carro} });
      }


    }



    buscarMarca(){

      this.modalRef = this.modalService.open(this.modalMarcas,{modalClass:'modal-lg'});
    }

    retornoMarca(marca:Marca){
      this.carro.marca = marca;
      this.modalRef.close();
    }
}

