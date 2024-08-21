
import { Component, EventEmitter,  inject, Input, Output, output } from '@angular/core';
import { MdbFormsModule, } from 'mdb-angular-ui-kit/forms';
import { FormsModule } from '@angular/forms';
import { Marca } from '../../../models/marca';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MarcaService } from '../../../services/marca.service';
import { Acessorios } from '../../../models/acessorios';
import { AcessorioServiceService } from '../../../services/acessorio-service.service';

@Component({
  selector: 'app-new-acessorios',
  standalone: true,
  imports: [MdbFormsModule, FormsModule],
  templateUrl: './new-acessorios.component.html',
  styleUrl: './new-acessorios.component.scss'
})
export class NewAcessoriosComponent {

  acessorioService = inject(AcessorioServiceService);//@Autowired

    @Input("acessorio") acessorio:Acessorios = new Acessorios(0,'');
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

      this.acessorioService.findById(id).subscribe({
        next: retorno => {
          this.acessorio = retorno;
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
      if(this.acessorio.id > 0){

        this.acessorioService.update(this.acessorio, this.acessorio.id).subscribe({ //UPDATE
          next: mensagem => {
            Swal.fire({   //EXIBE MENSAGEM
              title:mensagem,
              icon:'success',
              confirmButtonText: 'Ok'
            });
            this.router2.navigate(['admin/acessorio'], { state:{ acessorioEditado: this.acessorio} });
            this.retorno.emit(this.acessorio);
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


        this.acessorioService.save(this.acessorio).subscribe({ //SALVAR
          next: mensagem => {
            Swal.fire({   //EXIBE MENSAGEM
              title:mensagem,
              icon:'success',
              confirmButtonText: 'Ok'
            });
             //FECHAR MODAL
            this.router2.navigate(['admin/acessorio'], { state:{ AcessorioNovo: this.acessorio} });
            this.retorno.emit(this.acessorio);
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
        this.router2.navigate(['admin/acessorio'], { state:{ AcessorioNovo: this.acessorio} });
      }


    }
}
