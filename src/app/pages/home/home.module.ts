import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContainerShowWorkspaceInfoModule } from '@components/container-show-workspace-info/container-show-workspace-info.module';
import { HeaderModule } from '@components/header/header.module';
import { NavbarModule } from '@components/navbar/navbar.module';

import { HomeRoutingModule } from './home-routing.module';
import { HomePage } from './home.page';


@NgModule({
  declarations: [HomePage],
  imports: [
    CommonModule,
    ContainerShowWorkspaceInfoModule,
    HeaderModule,
    HomeRoutingModule,
    NavbarModule
  ]
})
export class HomeModule { }
