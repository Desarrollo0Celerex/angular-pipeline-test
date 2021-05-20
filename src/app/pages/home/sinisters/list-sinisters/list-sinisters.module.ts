import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContentsModule } from '@components/contents/contents.module';

import { ListSinistersRoutingModule } from './list-sinisters-routing.module';
import { ListSinistersPage } from './list-sinisters.page';


@NgModule({
  declarations: [ListSinistersPage],
  imports: [
    CommonModule,
    ContentsModule,
    ListSinistersRoutingModule
  ]
})
export class ListSinistersModule { }
