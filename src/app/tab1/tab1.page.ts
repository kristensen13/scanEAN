import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { HttpClient } from '@angular/common/http';
import { LoaderService } from '../services/loader.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  code: any;
  data: any;
  id: any;
  nombreArchivo: any;
  image: any;
  codeStr = 'Código: ';
  constructor(
    private barcodeScanner: BarcodeScanner,
    private http: HttpClient,
    private ionLoader: LoaderService
  ) {}

  // showLoader() {
  //   this.ionLoader.showLoader();

  //   setTimeout(() => {
  //     this.hideLoader();
  //   }, 2000);
  // }

  // hideLoader() {
  //   this.ionLoader.hideLoader();
  // }

  scan() {
    this.barcodeScanner.scan().then((barcodeData) => {
      this.code = barcodeData.text;
      console.log('Barcode data', this.code);
      this.http
        .get(
          `https://www.coalimaronline.com/api/Articulo/PorCodigoBarras/${this.code}.`
        )
        .subscribe((resp: any) => {
          console.log(resp);
          if (Object.entries(resp).length !== 0) {
            this.data = resp[0];
            this.id = resp[0].Id;
            console.log(this.id);

            this.http
              .get(
                `https://www.coalimaronline.com/api/FotoDeProducto/PequePrincipalPorIdArticulo/${this.id}`
              )
              .subscribe((res: any) => {
                console.log(res.Id);
                this.nombreArchivo = res.NombreArchivo;
                console.log(this.nombreArchivo);

                this.image = `https://www.coalimaronline.com/assets/fotosArticulos/${this.nombreArchivo}`;
                console.log(this.image);
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
    });
  }
}
