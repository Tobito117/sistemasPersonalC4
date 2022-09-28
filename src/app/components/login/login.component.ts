import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  //Formulario reactivo para iniciar sesión
  public loginForm!: FormGroup;

  public loading: boolean = false;

  constructor(
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _authService: AuthService
  ) { 
    this.buildFormLogin();
  }

  ngOnInit(): void {
  }

  buildFormLogin()
  {
    this.loginForm = this._formBuilder.group({
      idUsuario: ['', Validators.required],
      contrasenia: ['', Validators.required]
    });
  }

  iniciarSesion()
  {
    if (this.loginForm.invalid) {
      Object.values(this.loginForm.controls).forEach( control => {
        control.markAsTouched();
      });
      return;
    }

    this.loading = true;

    this._authService.login(this.loginForm.value.idUsuario, this.loginForm.value.contrasenia).subscribe(
      response => {
        console.log(response);
        this.loading = false;
        this._router.navigate(['/personal']);
      },
      error => {
        console.log(error);
        this.loading = false;
        if (error.status == 400)
        {
          Swal.fire({
            icon: 'error',
            title: 'Error al autenticar',
            text: 'Usuario y/o contraseña no válidos',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#922240'
          });
        }
        else
        {
          Swal.fire({
            icon: 'error',
            title: 'Error al autenticar',
            text: error.message,
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#922240'
          });
        }
      }
    );
  }

  //Validaciones para el formulario reactivo
  get idUsuarioNoValido() {
    return this.loginForm.get('idUsuario')?.invalid && this.loginForm.get('idUsuario')?.touched;
  }

  get contraseniaNoValida() {
    return this.loginForm.get('contrasenia')?.invalid && this.loginForm.get('contrasenia')?.touched;
  }

}