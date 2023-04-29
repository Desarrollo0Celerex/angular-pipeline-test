import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingContentModule } from '@components/loading-content/loading-content.module';
import { ContactService } from '@core/services/contact/contact.service';

import { ChartContactGlobalBalanceComponent } from './chart-contact-global-balance.component';

@NgModule({
    declarations: [ChartContactGlobalBalanceComponent],
    exports: [ChartContactGlobalBalanceComponent],
    imports: [CommonModule, LoadingContentModule],
    providers: [ContactService],
})
export class ChartContactGlobalBalanceModule {}
