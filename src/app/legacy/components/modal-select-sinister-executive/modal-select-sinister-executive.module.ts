import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DropdownSelectPhoneCodeModule } from '@components/dropdown-select-phone-code/dropdown-select-phone-code.module';
import { ExecutiveService } from '@services/executive.service';
import { SinisterService } from '@services/sinister.service';

import { ModalSelectSinisterExecutiveComponent } from './modal-select-sinister-executive.component';

@NgModule({
    declarations: [ModalSelectSinisterExecutiveComponent],
    exports: [ModalSelectSinisterExecutiveComponent],
    imports: [
        CommonModule,
        DropdownSelectPhoneCodeModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    providers: [ExecutiveService, SinisterService],
})
export class ModalSelectSinisterExecutiveModule {}
