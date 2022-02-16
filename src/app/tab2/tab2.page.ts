import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Network } from '@capacitor/network';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  //code: any = 8410494300036;

  show = true;

  code: any;
  data: any;
  id: any;
  nombreArchivo: any;
  image: any;
  codeStr = 'Código: ';
  constructor(private http: HttpClient) {}
  buscar(event) {
    setTimeout(() => {
      this.show = false;
    }, 1000);
    this.code = event.target.value;
    //console.log(this.code);

    this.http
      .get(
        `https://www.coalimaronline.com/api/Articulo/PorCodigoBarras/${this.code}.`
      )
      .subscribe((resp: any) => {
        //console.log(resp);
        if (Object.entries(resp).length !== 0) {
          this.data = resp[0];
          this.id = resp[0].Id;
          //console.log(this.id);

          this.http
            .get(
              `https://www.coalimaronline.com/api/FotoDeProducto/PequePrincipalPorIdArticulo/${this.id}`
            )
            .subscribe((res: any) => {
              //console.log(res.Id);
              this.nombreArchivo = res.NombreArchivo;
              // console.log(this.nombreArchivo);

              this.image = `https://www.coalimaronline.com/assets/fotosArticulos/${this.nombreArchivo}`;
              //console.log(this.image);
            });
        } else {
          // console.log('Hola');
          this.image = '../../assets/images/busquedaSinResultados.png';
          this.codeStr = '';
          this.data = {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            //Nombre: 'No existe el producto',
            // eslint-disable-next-line @typescript-eslint/naming-convention
            //Pvp: null,
            // eslint-disable-next-line @typescript-eslint/naming-convention
            //Codigo: '---',
          };
        }
      });

    // // .catch((err) => {
    // //   console.log('Error', err);
    // // });
    //});
  }
}
