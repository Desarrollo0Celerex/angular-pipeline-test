import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvalidExpressTokenRoutingModule } from './invalid-express-token-routing.module';
import { InvalidExpressTokenPage } from './invalid-express-token.page';


@NgModule({
  declarations: [InvalidExpressTokenPage],
  imports: [
    CommonModule,
    InvalidExpressTokenRoutingModule
  ]
})
export class InvalidExpressTokenModule { }
