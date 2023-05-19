import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContentsModule } from '@components/contents/contents.module';

import { ListFilesRoutingModule } from './list-files-routing.module';
import { ListFilesPage } from './list-files.page';

@NgModule({
  declarations: [ListFilesPage],
  imports: [
    CommonModule,
    ContentsModule,
    ListFilesRoutingModule
  ]
})
export class ListFilesModule { }
