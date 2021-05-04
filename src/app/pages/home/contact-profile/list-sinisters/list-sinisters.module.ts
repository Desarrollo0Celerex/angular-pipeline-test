import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListSinistersRoutingModule } from './list-sinisters-routing.module';
import { ListSinistersPage } from './list-sinisters.page';


@NgModule({
  declarations: [ListSinistersPage],
  imports: [
    CommonModule,
    ListSinistersRoutingModule
  ]
})
export class ListSinistersModule { }
