import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IdentifyUserRoutingModule } from './identify-user-routing.module';
import { IdentifyUserPage } from './identify-user.page';
import { IdentifyUserService } from './identify-user.service';


@NgModule({
  declarations: [IdentifyUserPage],
  imports: [
    CommonModule,
    IdentifyUserRoutingModule
  ],
  providers: [IdentifyUserService]
})
export class IdentifyUserModule { }
