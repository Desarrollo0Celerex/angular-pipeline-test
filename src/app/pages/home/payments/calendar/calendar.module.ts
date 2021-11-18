import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContentKpisModule } from '@components/content-kpis/content-kpis.module';

import { CalendarRoutingModule } from './calendar-routing.module';
import { CalendarPage } from './calendar.page';


@NgModule({
  declarations: [
    CalendarPage
  ],
  imports: [
    CommonModule,
    CalendarRoutingModule,
    ContentKpisModule
  ]
})
export class CalendarModule { }
