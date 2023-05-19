import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PluralPipe } from './plural.pipe';

@NgModule({
    declarations: [PluralPipe],
    exports: [PluralPipe],
    imports: [CommonModule],
})
export class PluralModule {}
