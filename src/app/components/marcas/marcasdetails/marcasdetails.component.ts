import { Component, EventEmitter,  inject, Input, Output, output } from '@angular/core';
import { MdbFormsModule, } from 'mdb-angular-ui-kit/forms';
import { FormsModule } from '@angular/forms';
import { Marca } from '../../../models/marca';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MarcaService } from '../../../services/marca.service';
import { AcessorioServiceService } from '../../../services/acessorio-service.service';



@Component({
  selector: 'app-marcasdetails',
  standalone: true,
  imports: [MdbFormsModule, FormsModule],
  templateUrl: './marcasdetails.component.html',
  styleUrl: './marcasdetails.component.scss'
})
export class MarcasdetailsComponent {

  marcaService = inject(MarcaService);//@Autowired

    @Input("marca") marca:Marca = new Marca(0,'');
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

      this.marcaService.findById(id).subscribe({
        next: retorno => {
          this.marca = retorno;
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
      if(this.marca.id > 0){

        this.marcaService.update(this.marca, this.marca.id).subscribe({ //UPDATE
          next: mensagem => {
            Swal.fire({   //EXIBE MENSAGEM
              title:mensagem,
              icon:'success',
              confirmButtonText: 'Ok'
            });
            this.router2.navigate(['admin/marcas'], { state:{ carroEditado: this.marca} });
            this.retorno.emit(this.marca);
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


        this.marcaService.save(this.marca).subscribe({ //SALVAR
          next: mensagem => {
            Swal.fire({   //EXIBE MENSAGEM
              title:mensagem,
              icon:'success',
              confirmButtonText: 'Ok'
            });
             //FECHAR MODAL
            this.router2.navigate(['admin/marcas'], { state:{ carroNovo: this.marca} });
            this.retorno.emit(this.marca);
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
        this.router2.navigate(['admin/marcas'], { state:{ carroNovo: this.marca} });
      }


    }
}
