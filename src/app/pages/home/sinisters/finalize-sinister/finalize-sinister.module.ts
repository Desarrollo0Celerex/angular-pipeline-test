import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinalizeSinisterRoutingModule } from './finalize-sinister-routing.module';
import { FinalizeSinisterPage } from './finalize-sinister.page';


@NgModule({
  declarations: [FinalizeSinisterPage],
  imports: [
    CommonModule,
    FinalizeSinisterRoutingModule
  ]
})
export class FinalizeSinisterModule { }
