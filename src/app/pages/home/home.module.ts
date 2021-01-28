import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderModule } from '@components/header/header.module';

import { HomeRoutingModule } from './home-routing.module';
import { HomePage } from './home.page';


@NgModule({
  declarations: [HomePage],
  imports: [
    CommonModule,
    HeaderModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
