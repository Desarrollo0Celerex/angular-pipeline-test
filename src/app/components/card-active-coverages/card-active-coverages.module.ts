import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingContentModule } from '@components/loading-content/loading-content.module';
import { PolicyService } from '@services/policy.service';

import { CardActiveCoveragesComponent } from './card-active-coverages.component';

@NgModule({
  declarations: [CardActiveCoveragesComponent],
  exports: [CardActiveCoveragesComponent],
  imports: [
    CommonModule,
    LoadingContentModule
  ],
  providers: [PolicyService]
})
export class CardActiveCoveragesModule { }
