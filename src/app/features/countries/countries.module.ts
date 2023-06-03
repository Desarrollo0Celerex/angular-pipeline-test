import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhoneCodesComponent } from './components/phone-codes/phone-codes.component';

@NgModule({
    declarations: [PhoneCodesComponent],
    exports: [PhoneCodesComponent],
    imports: [CommonModule],
})
export class CountriesModule {}
