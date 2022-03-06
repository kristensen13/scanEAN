import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab2PageRoutingModule } from './tab2-routing.module';

import { NodataPipe } from '../pipes/nodata.pipe';
import { NoimagePipe } from '../pipes/noimage.pipe';

@NgModule({
  imports: [
    IonicModule,
    RouterModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab2PageRoutingModule,
  ],
  declarations: [Tab2Page, NoimagePipe, NodataPipe],
})
export class Tab2PageModule {}
