import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';

import { ContentKpisModule } from '@components/content-kpis/content-kpis.module';
import { ContentListModule } from '@components/content-list/content-list.module';
import { PaymentService } from '@services/payment.service';

import { CalendarRoutingModule } from './calendar-routing.module';
import { CalendarPage } from './calendar.page';

@NgModule({
  declarations: [
    CalendarPage
  ],
  imports: [
    CalendarRoutingModule,
    CommonModule,
    ContentListModule,
    ContentKpisModule,
    MatDatepickerModule,
    MatMomentDateModule
  ],
  providers: [
      PaymentService,
      { provide: MAT_DATE_LOCALE, useValue: 'es' }
  ]
})
export class CalendarModule { }
