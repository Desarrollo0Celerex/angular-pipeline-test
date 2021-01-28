import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { WorkspaceUserService } from '@services/workspace-user.service';

import { HeaderComponent } from './header.component';
import { HeaderService } from './header.service';

@NgModule({
  declarations: [HeaderComponent],
  exports: [HeaderComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  providers: [HeaderService, WorkspaceUserService]
})
export class HeaderModule { }
