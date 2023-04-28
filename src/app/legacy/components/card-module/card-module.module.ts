import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CardModuleComponent } from './card-module.component';

@NgModule({
  declarations: [
    CardModuleComponent
  ],
  exports: [
    CardModuleComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class CardModuleModule { }
