import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardGroupComponent } from './card-group.component';

@NgModule({
  declarations: [
    CardGroupComponent
  ],
  exports: [
      CardGroupComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CardGroupModule { }
