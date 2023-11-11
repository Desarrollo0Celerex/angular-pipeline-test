import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CountriesRoutingModule } from './countries-routing.module';
import { PhoneCodeButtonComponent } from './components/phone-code-button/phone-code-button.component';
import { SelectPhoneCodeModalComponent } from './components/select-phone-code-modal/select-phone-code-modal.component';
import { CountryService } from './services/country.service';

@NgModule({
    declarations: [PhoneCodeButtonComponent, SelectPhoneCodeModalComponent],
    exports: [PhoneCodeButtonComponent],
    imports: [CommonModule, CountriesRoutingModule],
    providers: [CountryService],
})
export class CountriesModule {}
