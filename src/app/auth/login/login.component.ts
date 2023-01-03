import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

declare const google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit {

  @ViewChild('googleBtn') googleBtn!: ElementRef

  public formSubmitted = false;

  public loginForm: FormGroup = this.fb.group({
    email: [localStorage.getItem('email') || '', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    remember: [false],
  });

  constructor(private fb: FormBuilder,
    private router: Router,
    private usuarioService: UsuarioService) { }

  ngAfterViewInit(): void {
    this.googleInit();
  }

  googleInit() {

    google.accounts.id.initialize({
      client_id: "43811651355-htpb9g4aansmihnop5fabsvdk7sm5mi8.apps.googleusercontent.com",
      callback: (response: any) => this.handleCredentialResponse(response)
    });

    google.accounts.id.renderButton(
      // document.getElementById("buttonDiv"),
      this.googleBtn.nativeElement,
      { theme: "outline", size: "large" }  // customization attributes
    );

  }

  handleCredentialResponse(response: any) {
    console.log("Encoded JWT ID toke : " + response.credential);
    this.usuarioService.loginGoogle(response.credential)
      .subscribe(resp => {
        //    console.log({ login: resp });
        this.router.navigateByUrl('/');

      })
  }

  login() {

    this.usuarioService.login(this.loginForm.value)
      .subscribe(
        {
          next: resp => {
            if (this.loginForm.get('remember')?.value) {
              localStorage.setItem('email', this.loginForm.get('email')?.value);
            } else {
              localStorage.removeItem('email');
            }
            this.router.navigateByUrl('/');

          },
          error: (error) => {
            //Si sucede un error
            Swal.fire('Error', error.error.msg, 'error');
          }
        });
    //this.router.navigateByUrl('/');
  }

}
