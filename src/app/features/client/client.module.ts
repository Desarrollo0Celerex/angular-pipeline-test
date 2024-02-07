import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectClientTypeModalComponent } from './components/select-client-type-modal/select-client-type-modal.component';

@NgModule({
    declarations: [SelectClientTypeModalComponent],
    exports: [SelectClientTypeModalComponent],
    imports: [CommonModule],
})
export class ClientModule {}
