import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SinisterStatusService } from '@services/sinister-status.service';

import { ModalSelectSinisterStatusComponent } from './modal-select-sinister-status.component';
import { ModalSelectSinisterStatusService } from './modal-select-sinister-status.service';
import { PluralModule } from '@pipes/plural/plural.module';

@NgModule({
    declarations: [ModalSelectSinisterStatusComponent],
    exports: [ModalSelectSinisterStatusComponent],
    imports: [CommonModule, RouterModule, PluralModule],
    providers: [ModalSelectSinisterStatusService, SinisterStatusService],
})
export class ModalSelectSinisterStatusModule {}
