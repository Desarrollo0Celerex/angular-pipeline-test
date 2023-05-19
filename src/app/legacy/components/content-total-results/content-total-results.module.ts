import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContentTotalResultsComponent } from './content-total-results.component';
import { ContentTotalResultsService } from './content-total-results.service';
import { PluralModule } from '@pipes/plural/plural.module';

@NgModule({
    declarations: [ContentTotalResultsComponent],
    exports: [ContentTotalResultsComponent],
    imports: [CommonModule, PluralModule],
    providers: [ContentTotalResultsService],
})
export class ContentTotalResultsModule {}
