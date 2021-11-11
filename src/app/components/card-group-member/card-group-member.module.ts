import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CardGroupMemberComponent } from './card-group-member.component';

@NgModule({
  declarations: [
    CardGroupMemberComponent
  ],
  exports: [
      CardGroupMemberComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class CardGroupMemberModule { }
