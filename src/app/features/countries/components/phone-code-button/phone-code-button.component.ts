import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
    ViewChild,
} from '@angular/core';
import { SelectPhoneCodeModalComponent } from '../select-phone-code-modal/select-phone-code-modal.component';
import { CountryService } from '@countries/services/country.service';
import { Country } from '@countries/interfaces/country.interface';

@Component({
    selector: 'agt-phone-code-button',
    templateUrl: './phone-code-button.component.html',
    styles: [],
    standalone: false
})
export class PhoneCodeButtonComponent implements OnChanges, OnInit {
    @Input() phoneCodeId = 0;
    @Input() phoneCode = '';
    @Output() phoneCodeIdSelected = new EventEmitter<number>();
    @Output() phoneCodeSelected = new EventEmitter<string>();
    @ViewChild(SelectPhoneCodeModalComponent)
    selectPhoneCodeModalComponent!: SelectPhoneCodeModalComponent;
    countries: Country[] = [];
    phoneCodeInfo: { flag: string; code: string } | undefined = undefined;

    constructor(private _countryService: CountryService) {}

    ngOnChanges(changes: SimpleChanges): void {
        if (
            changes.phoneCodeId &&
            changes.phoneCodeId.currentValue &&
            this.countries.length > 0
        ) {
            const country = this._findCountryByPhoneCodeId(
                changes.phoneCodeId.currentValue
            );
            this._updatePhoneCodeInfo(country);
        }
        if (
            changes.phoneCode &&
            changes.phoneCode.currentValue &&
            this.countries.length > 0
        ) {
            const country = this._findCountryByPhoneCode(
                changes.phoneCode.currentValue
            );
            this._updatePhoneCodeInfo(country);
        }
    }

    ngOnInit(): void {
        this._loadCountries();
    }

    showModalSelectPhoneCode(): void {
        const isPhoneCode = this.phoneCode !== '' ? true : false;
        this.selectPhoneCodeModalComponent.init(isPhoneCode);
    }

    selectPhoneCodeId(phoneCodeId: number): void {
        this.phoneCodeIdSelected.emit(phoneCodeId);
        const country = this._findCountryByPhoneCodeId(phoneCodeId);
        this._updatePhoneCodeInfo(country);
    }

    selectPhoneCode(phoneCode: string): void {
        this.phoneCodeSelected.emit(phoneCode);
        const country = this._findCountryByPhoneCode(phoneCode);
        this._updatePhoneCodeInfo(country);
    }

    private _loadCountries(): void {
        const fields = 'countryId,code,flag';
        this._countryService.getCountries(fields).subscribe((countries) => {
            this.countries = countries;
            const country = this.phoneCodeId
                ? this._findCountryByPhoneCodeId(this.phoneCodeId)
                : this._findCountryByPhoneCode(this.phoneCode);
            this._updatePhoneCodeInfo(country);
        });
    }

    private _updatePhoneCodeInfo(country: Country): void {
        this.phoneCodeInfo = {
            flag: country.flag,
            code: country.code,
        };
    }

    private _findCountryByPhoneCode(phoneCode: string): Country {
        const countryFound = this.countries.find(
            (country) => country.code == phoneCode
        );
        return countryFound!;
    }

    private _findCountryByPhoneCodeId(phoneCodeId: number): Country {
        const countryFound = this.countries.find(
            (country) => country.countryId == phoneCodeId
        );
        return countryFound!;
    }
}
