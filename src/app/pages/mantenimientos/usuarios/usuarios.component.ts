import { Component, OnDestroy, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { Usuario } from 'src/app/models/usuario.models';

import { BusquedasService } from 'src/app/services/busquedas.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { delay, Subscription } from 'rxjs';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit, OnDestroy {


  public totalUsuarios: number = 0;
  public usuarios: Usuario[] = [];
  public usuariosTemp: Usuario[] = [];

  public imgSubs!: Subscription;
  public desde: number = 0;
  public isLoading: boolean = true;
  public noPagination = true;

  constructor(private usuarioServices: UsuarioService,
    private busquedaService: BusquedasService,
    private modalImagenService: ModalImagenService) { }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {

    this.rebindUsuarios();
    this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(delay(100))
      .subscribe(img => this.rebindUsuarios());

  }

  rebindUsuarios() {
    this.isLoading = true;
    this.usuarioServices.obtenerUsuarios(this.desde)
      .subscribe(({ total, usuarios }) => {
        this.totalUsuarios = total;
        this.usuarios = usuarios;
        this.usuariosTemp = usuarios;
        this.isLoading = false;
      })
  }

  cambiarPagina(valor: number) {

    this.desde += valor;

    if (this.desde < 0) {
      this.desde = 0
    } else if (this.desde > this.totalUsuarios) {
      this.desde -= valor;
    }

    this.rebindUsuarios();

  }

  buscar(termino: string) {

    if (termino.length === 0) {
      this.noPagination = true;
      return this.usuarios = this.usuariosTemp;
    }

    this.noPagination = false;

    this.busquedaService.buscar('usuarios', termino)
      .subscribe(resultados => {
        this.usuarios = (resultados as Usuario[])
      })
  }

  borrarUsuario(usuario: Usuario) {

    if (usuario.uid === this.usuarioServices.uid) {
      return Swal.fire('Error', 'No puedes borrar tu propio usuario', 'error');
    }

    Swal.fire({
      title: '¿Se encuentra seguro?',
      text: `Esta seguro de eliminar el usuario ${usuario.nombre}, esta acción no se puede reversar`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {

        this.usuarioServices.eliminarUsuario(usuario)
          .subscribe((resp: any) => {

            this.rebindUsuarios();
            Swal.fire(
              resp.msg,
              `El usuario ${usuario.nombre} se elimino correctamente`,
              'success'
            )

          });

      }
    })
  }

  cambiarRol(usuario: Usuario) {

    this.usuarioServices.actualizarUser(usuario)
      .subscribe(resp => console.log(resp))
  }

  cambiarImagen(usuario: Usuario) {
    console.log(usuario)
    this.modalImagenService.abrirModal('usuarios', usuario.uid!, usuario.img);
  }
}
