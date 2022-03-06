import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioModel } from '../../models/usuario.model';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  usuario: UsuarioModel = new UsuarioModel();
  recordarme = 'isChecked';

  constructor( private auth: AuthService, private router: Router ) {}

  ngOnInit() {}

  login(form: NgForm){

    if (form.invalid) { return; }

    Swal.fire(
      {
        allowOutsideClick: false,
        icon: 'info',
        text: 'Espere por favor...',
      }
    );
    Swal.showLoading();

    this.auth.login( this.usuario ).subscribe( resp => {
      //console.log( resp );
      Swal.close();
      this.router.navigateByUrl('/tabs');
    }, (err) => {
      //console.log( err.error.error.message );
      Swal.fire(
        {
          icon: 'error',
          title: 'Error al autenticar',
          text: err.error.error.message
        }
      );
    });

  }
}
