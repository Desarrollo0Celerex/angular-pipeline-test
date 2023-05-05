import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContentResultsTopComponent } from './content-results-top.component';
import { PluralModule } from '@pipes/plural/plural.module';

@NgModule({
    declarations: [ContentResultsTopComponent],
    exports: [ContentResultsTopComponent],
    imports: [CommonModule, PluralModule],
})
export class ContentResultsTopModule {}
