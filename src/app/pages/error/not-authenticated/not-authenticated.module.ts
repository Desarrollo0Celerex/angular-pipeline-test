import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotAuthenticatedRoutingModule } from './not-authenticated-routing.module';
import { NotAuthenticatedPage } from './not-authenticated.page';


@NgModule({
  declarations: [NotAuthenticatedPage],
  imports: [
    CommonModule,
    NotAuthenticatedRoutingModule
  ]
})
export class NotAuthenticatedModule { }
