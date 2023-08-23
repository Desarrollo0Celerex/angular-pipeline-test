import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownPhoneCodesComponent } from './components/dropdown-phone-codes/dropdown-phone-codes.component';

@NgModule({
    declarations: [DropdownPhoneCodesComponent],
    exports: [DropdownPhoneCodesComponent],
    imports: [CommonModule],
})
export class CountriesModule {}
