import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  public formSubmitted = false;

  public registerForm = this.fb.group({
    nombre: ['ruben', [Validators.required]],
    email: ['rrubio@myapp.com', [Validators.required, Validators.email]],
    password: ['123', [Validators.required]],
    confirmaPassword: ['123', [Validators.required]],
    terminos: [true, [Validators.required]],

  }, {
    Validators: this.passwordsIguales('password', 'confirmaPassword')
  });

  constructor(private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router,) { }

  crearUsuario() {
    this.formSubmitted = true;
    console.log(this.registerForm.value);

    if (this.registerForm.invalid) {
      return;
    }

    //Realizar el posteo de la información
    this.usuarioService.crearUsuario(this.registerForm.value)
      .subscribe(
        {
          next: resp => {
            console.log('Usuario creado');
            console.log(resp);
            this.router.navigateByUrl('/');
          },
          error: (error) => {
            //Si sucede un error
            Swal.fire('Error', error.error.msg, 'error');
          }
        }
      );

  }

  campoNoValido(campo: string): boolean {
    if (this.registerForm.get(campo)?.invalid && this.formSubmitted) {
      return true;
    }
    else {
      return false;
    }

  }

  contrasenasNoValidas() {
    const pass1 = this.registerForm.get('password')?.value;
    const pass2 = this.registerForm.get('confirmaPassword')?.value;

    if ((pass1 !== pass2) && this.formSubmitted) {
      return true;
    }
    else {
      return false;
    }
  }

  aceptarTerminos() {
    return !this.registerForm.get('terminos')?.invalid && this.formSubmitted
  }

  passwordsIguales(password: string, confirmaPassword: string) {

    return (formGroup: FormGroup) => {

      const passwordControl = formGroup.get(password);
      const confirmaPasswordControl = formGroup.get(confirmaPassword);

      if (passwordControl?.value === confirmaPasswordControl) {
        confirmaPasswordControl?.setErrors(null);
      } else {
        confirmaPasswordControl?.setErrors({ noEsIgual: true });
      }


    }

  }

}
