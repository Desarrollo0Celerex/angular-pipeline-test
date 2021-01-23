import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IdentifierRoutingModule } from './identifier-routing.module';
import { IdentifierPage } from './identifier.page';
import { IdentifierService } from './identifier.service';


@NgModule({
  declarations: [IdentifierPage],
  imports: [
    CommonModule,
    IdentifierRoutingModule
  ],
  providers: [IdentifierService]
})
export class IdentifierModule { }
