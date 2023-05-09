import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalSelectCancellationTypeComponent } from './modal-select-cancellation-type.component';

@NgModule({
    declarations: [ModalSelectCancellationTypeComponent],
    exports: [ModalSelectCancellationTypeComponent],
    imports: [CommonModule],
})
export class ModalSelectCancellationTypeModule {}
