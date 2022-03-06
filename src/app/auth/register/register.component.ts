import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UsuarioModel } from '../../models/usuario.model';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  usuario: UsuarioModel;
  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.usuario = new UsuarioModel();

    //this.usuario.email = 'willy.loayza@gmail.com';
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor...',
    });
    Swal.showLoading();

    this.auth.nuevoUsuario(this.usuario).subscribe(
      (resp) => {
        console.log(resp);
        Swal.close();
        this.router.navigateByUrl('/tabs');
      },
      (err) => {
        console.log(err.error.error.message);
        Swal.fire({
          icon: 'error',
          title: 'Error al autenticar',
          text: err.error.error.message,
        });
      }
    );

    // console.log('Enviado');
    // console.log(this.usuario);
    // console.log(form);
  }
}
