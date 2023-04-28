import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChangelogRoutingModule } from './changelog-routing.module';
import { ChangelogPage } from './changelog.page';


@NgModule({
  declarations: [
    ChangelogPage
  ],
  imports: [
    CommonModule,
    ChangelogRoutingModule
  ]
})
export class ChangelogModule { }
