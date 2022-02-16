import { Component } from '@angular/core';
import { Network } from '@ionic-native/network/ngx';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private network: Network, public alertCtr: AlertController) {
    window.addEventListener('offline', () => {
      this.openAlert();
    });
  }

  async openAlert() {
    const alert = await this.alertCtr.create({
      header: 'Revisa tu conexión a Internet',
      message: 'No tienes conexión a Internet.',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            // eslint-disable-next-line @typescript-eslint/dot-notation
            navigator['app'].exitApp();
          },
        },
      ],
    });
    await alert.present();
  }
}
