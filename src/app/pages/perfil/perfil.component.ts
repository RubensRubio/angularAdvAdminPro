import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.models';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {

  public perfilForm!: FormGroup;
  public usuario!: Usuario;
  public imagenUpload!: File;
  public imgTemp!: any;

  constructor(private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private fileUploadService: FileUploadService) {

    this.usuario = usuarioService.usuario;

  }

  ngOnInit(): void {

    this.perfilForm = this.fb.group({
      nombre: [this.usuario.nombre, Validators.required],
      email: [this.usuario.email, [Validators.required, Validators.email]],
    });

  }

  actualizarPerfil() {
    console.log(this.perfilForm.value)
    this.usuarioService.actualizarUsuario(this.perfilForm.value)
      .subscribe(
        {

          next: resp => {
            console.log(resp);
            const { nombre, email } = this.perfilForm.value;
            this.usuario.nombre = nombre;
            this.usuario.email = email;
            Swal.fire('OK', 'Usuario actualizado', 'success');
          },
          error: (error) => {
            Swal.fire('Error al actualizar el usuario', error.error.msg, 'error');
          }
        }
      );
  }

  cambiarImagen(file: File) {
    this.imagenUpload = file;

    if (!file) {
      return this.imgTemp = null;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      this.imgTemp = reader.result;
    }

  }

  subirImagen() {
    this.fileUploadService.actualizarFoto(this.imagenUpload, 'usuarios', this.usuario.uid!)
      .then(img => {
        this.usuario.img = img;
        Swal.fire('OK', 'Imagen de usuario actualizada correctamente', 'success');
      }).catch(err => Swal.fire('Error al actualizar la imagen usuario', 'No se pudo subir la imagen', 'error'));
  }

}
