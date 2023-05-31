import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CardContentKpiComponent } from './card-content-kpi.component';

@NgModule({
    declarations: [CardContentKpiComponent],
    exports: [CardContentKpiComponent],
    imports: [CommonModule, RouterModule],
})
export class CardContentKpiModule {}
