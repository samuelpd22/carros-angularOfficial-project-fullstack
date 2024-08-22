import { Component } from '@angular/core';
import { MenuComponent } from "../menu/menu.component";
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [MenuComponent,RouterOutlet ,SidebarComponent],//Importar para usar no HTML outros componentes por TAG
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.scss'
})
export class PrincipalComponent {

}
