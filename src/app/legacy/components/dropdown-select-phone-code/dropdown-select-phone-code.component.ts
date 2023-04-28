import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

import { DropdownSelectPhoneCodeService } from './dropdown-select-phone-code.service';

declare var TooltipPlugin: any;

@Component({
  selector: 'agt-dropdown-select-phone-code',
  templateUrl: './dropdown-select-phone-code.component.html',
  styles: [
  ]
})
export class DropdownSelectPhoneCodeComponent implements OnChanges {
    @Input() phoneCodeId: number;
    @Input() isDisabled: boolean;
    @Output() phoneCodeIdSelected: EventEmitter<number>;
    selectedPhoneCodePosition: number;

    constructor(public dropdownSelectPhoneCodeService: DropdownSelectPhoneCodeService) {
        this.phoneCodeId = 0;
        this.isDisabled = false;
        this.phoneCodeIdSelected = new EventEmitter<number>();
        this.selectedPhoneCodePosition = 0;
    }

    ngOnChanges(changes: SimpleChanges): void {
        if(!!changes.phoneCodeId && !!changes.phoneCodeId.currentValue) {
            this._loadPhoneCodes();
        }
    }

    /**
     * Click event to select the phone code
     * @param selectedPhoneCodePosition Selected phone code position
     */
    onClickSelectPhoneCode(selectedPhoneCodePosition: number): void {
        this.selectedPhoneCodePosition = selectedPhoneCodePosition;
        const selectedPhoneCodeId: number = this.dropdownSelectPhoneCodeService.phoneCodes[selectedPhoneCodePosition].countryId;
        this.phoneCodeIdSelected.emit(selectedPhoneCodeId);
    }

    /**
     * Request to load the phone codes
     */
    private _loadPhoneCodes(): void {
        this.dropdownSelectPhoneCodeService.loadPhoneCodes().subscribe( () => {
            TooltipPlugin.init();
            this.selectedPhoneCodePosition = this.dropdownSelectPhoneCodeService.getSelectedPhoneCodePosition(this.phoneCodeId);
        });
    }

}
