import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PolicyService } from '@services/policy.service';

import { PolicySearchEngineRoutingModule } from './policy-search-engine-routing.module';
import { PolicySearchEnginePage } from './policy-search-engine.page';


@NgModule({
  declarations: [
    PolicySearchEnginePage
  ],
  imports: [
    CommonModule,
    FormsModule,
    PolicySearchEngineRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
      PolicyService
  ]
})
export class PolicySearchEngineModule { }
