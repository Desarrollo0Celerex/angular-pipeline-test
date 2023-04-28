import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MenuStatsComponent } from './menu-stats.component';

@NgModule({
  declarations: [
    MenuStatsComponent
  ],
  exports: [
      MenuStatsComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class MenuStatsModule { }
