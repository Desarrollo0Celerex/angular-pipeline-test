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
})
export class PhoneCodeButtonComponent implements OnInit {
    @Input() phoneCodeId = 0;
    @Output() phoneCodeIdSelected = new EventEmitter<number>();
    @ViewChild(SelectPhoneCodeModalComponent)
    selectPhoneCodeModalComponent!: SelectPhoneCodeModalComponent;
    countries: Country[] = [];
    phoneCodeInfo: { flag: string; code: string } | undefined = undefined;

    constructor(private _countryService: CountryService) {}

    ngOnInit(): void {
        this._loadCountries();
    }

    showModalSelectPhoneCode(): void {
        this.selectPhoneCodeModalComponent.init();
    }

    selectPhoneCodeId(phoneCodeId: number): void {
        this.phoneCodeIdSelected.emit(phoneCodeId);
        this._updatePhoneCodeInfo(phoneCodeId);
    }

    private _loadCountries(): void {
        const fields = 'countryId,code,flag';
        this._countryService.getCountries(fields).subscribe((countries) => {
            this.countries = countries;
            this._updatePhoneCodeInfo(this.phoneCodeId);
        });
    }

    private _updatePhoneCodeInfo(phoneCodeId: number): void {
        const currentPhoneCode = this.countries.find(
            (country) => country.countryId == phoneCodeId
        );
        this.phoneCodeInfo = {
            flag: currentPhoneCode!.flag,
            code: currentPhoneCode!.code,
        };
    }
}
