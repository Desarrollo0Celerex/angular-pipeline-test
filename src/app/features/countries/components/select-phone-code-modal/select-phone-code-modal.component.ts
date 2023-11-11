import { Component, EventEmitter, Output } from '@angular/core';
import { Country } from '@countries/interfaces/country.interface';
import { CountryService } from '@countries/services/country.service';

declare var ModalPlugin: any;

@Component({
    selector: 'agt-select-phone-code-modal',
    templateUrl: './select-phone-code-modal.component.html',
    styles: [],
})
export class SelectPhoneCodeModalComponent {
    @Output() phoneCodeIdSelected = new EventEmitter<number>();
    modalId = 'agt-select-phone-code-modal';
    countries: Country[] = [];

    constructor(private _countryService: CountryService) {}

    init(): void {
        ModalPlugin.show(this.modalId);
        if (this.countries.length === 0) {
            this._loadCountries();
        }
    }

    selectPhoneCodeId(phoneCodeId: number): void {
        this.phoneCodeIdSelected.emit(phoneCodeId);
    }

    private _loadCountries(): void {
        const fields = 'countryId,code,flag';
        this._countryService.getCountries(fields).subscribe((countries) => {
            this.countries = countries;
        });
    }
}
