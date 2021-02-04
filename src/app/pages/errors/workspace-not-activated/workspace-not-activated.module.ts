import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkspaceNotActivatedRoutingModule } from './workspace-not-activated-routing.module';
import { WorkspaceNotActivatedPage } from './workspace-not-activated.page';


@NgModule({
  declarations: [WorkspaceNotActivatedPage],
  imports: [
    CommonModule,
    WorkspaceNotActivatedRoutingModule
  ]
})
export class WorkspaceNotActivatedModule { }
