import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContentsModule } from '@components/contents/contents.module';

import { SinistersRoutingModule } from './sinisters-routing.module';
import { SinistersPage } from './sinisters.page';


@NgModule({
  declarations: [
    SinistersPage
  ],
  imports: [
    CommonModule,
    SinistersRoutingModule,
    ContentsModule
  ]
})
export class SinistersModule { }
