import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FooterModule } from '@components/footer/footer.module';
import { HeaderModule } from '@components/header/header.module';
import { NavbarModule } from '@components/navbar/navbar.module';
import { SidebarModule } from '@components/sidebar/sidebar.module';
import { WorkspaceInfoModule } from '@components/workspace-info/workspace-info.module';

import { HomeRoutingModule } from './home-routing.module';
import { HomePage } from './home.page';

@NgModule({
  declarations: [HomePage],
  imports: [
    CommonModule,
    FooterModule,
    HeaderModule,
    HomeRoutingModule,
    NavbarModule,
    SidebarModule,
    WorkspaceInfoModule,
  ]
})
export class HomeModule { }
