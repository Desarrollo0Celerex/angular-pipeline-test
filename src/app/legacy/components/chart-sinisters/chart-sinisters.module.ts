import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingContentModule } from '@components/loading-content/loading-content.module';
import { SinisterService } from '@services/sinister.service';

import { ChartSinistersComponent } from './chart-sinisters.component';

@NgModule({
    declarations: [ChartSinistersComponent],
    exports: [ChartSinistersComponent],
    imports: [CommonModule, LoadingContentModule],
    providers: [SinisterService],
})
export class ChartSinistersModule {}
