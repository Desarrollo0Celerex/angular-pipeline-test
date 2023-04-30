import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';

import { ContentTotalResultsComponent } from './content-total-results.component';
import { ContentTotalResultsService } from './content-total-results.service';

@NgModule({
    declarations: [ContentTotalResultsComponent],
    exports: [ContentTotalResultsComponent],
    imports: [CommonModule, SharedModule],
    providers: [ContentTotalResultsService],
})
export class ContentTotalResultsModule {}
