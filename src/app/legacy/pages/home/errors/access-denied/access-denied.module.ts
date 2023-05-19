import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccessDeniedRoutingModule } from './access-denied-routing.module';
import { AccessDeniedPage } from './access-denied.page';


@NgModule({
  declarations: [AccessDeniedPage],
  imports: [
    CommonModule,
    AccessDeniedRoutingModule
  ]
})
export class AccessDeniedModule { }
