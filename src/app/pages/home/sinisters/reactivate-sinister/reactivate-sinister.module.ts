import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactivateSinisterRoutingModule } from './reactivate-sinister-routing.module';
import { ReactivateSinisterPage } from './reactivate-sinister.page';


@NgModule({
  declarations: [ReactivateSinisterPage],
  imports: [
    CommonModule,
    ReactivateSinisterRoutingModule
  ]
})
export class ReactivateSinisterModule { }
