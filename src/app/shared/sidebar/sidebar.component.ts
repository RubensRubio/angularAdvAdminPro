import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.models';
import { SidebarService } from 'src/app/services/sidebar.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  menuItems: any[];
  public usuario!: Usuario;

  constructor(private sideBarService: SidebarService,
    private usuarioService: UsuarioService) {
    this.menuItems = this.sideBarService.menu;
    this.usuario = usuarioService.usuario;
  }

  ngOnInit(): void {
  }

}
