import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Country } from '@features-legacy/countries/interfaces/country.interface';
import { CountriesService } from '@features-legacy/countries/services/countries.service';

@Component({
    selector: 'agt-dropdown-phone-codes',
    templateUrl: './dropdown-phone-codes.component.html',
    styles: [],
})
export class DropdownPhoneCodesComponent implements OnInit {
    @Input() phoneCode = '';
    @Input() isDisabled = false;
    @Output() phoneCodeSelected = new EventEmitter<string>();
    selectedCountryPosition = 0;
    countries: Country[] = [];

    constructor(private _countriesService: CountriesService) {}

    ngOnInit(): void {
        this.loadCountries();
    }

    loadCountries(): void {
        const fields = '';
        this._countriesService.getCountries(fields).subscribe((countries) => {
            this.countries = countries;
            this.selectedCountryPosition = this._getCountryPosition(
                this.phoneCode
            );
        });
    }

    selectPhoneCode(selectedCountryPosition: number): void {
        this.selectedCountryPosition = selectedCountryPosition;
        const selectedPhoneCode = this.countries[selectedCountryPosition].code;
        this.phoneCodeSelected.emit(selectedPhoneCode);
    }

    private _getCountryPosition(phoneCode: string): number {
        const position: number = this.countries.findIndex(
            (element: Country) => element.code === phoneCode
        );
        return position !== -1 ? position : 0;
    }
}
