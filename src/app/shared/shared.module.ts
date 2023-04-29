import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactStatusNamePipe } from './pipes/contact-status-name/contact-status-name.pipe';

@NgModule({
    declarations: [ContactStatusNamePipe],
    exports: [ContactStatusNamePipe],
    imports: [CommonModule],
})
export class SharedModule {}
