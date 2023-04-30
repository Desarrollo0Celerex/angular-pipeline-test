import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';

import { ContentResultsTopComponent } from './content-results-top.component';

@NgModule({
    declarations: [ContentResultsTopComponent],
    exports: [ContentResultsTopComponent],
    imports: [CommonModule, SharedModule],
})
export class ContentResultsTopModule {}
