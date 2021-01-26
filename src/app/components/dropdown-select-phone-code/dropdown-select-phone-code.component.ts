import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { DropdownSelectPhoneCodeService } from './dropdown-select-phone-code.service';

declare var TooltipPlugin: any;

@Component({
  selector: 'agt-dropdown-select-phone-code',
  templateUrl: './dropdown-select-phone-code.component.html',
  styles: [
  ]
})
export class DropdownSelectPhoneCodeComponent implements OnInit {
    @Input() phoneCodeId: number;
    @Output() phoneCodeIdSelected: EventEmitter<number>;
    selectedPhoneCodePosition: number;

    constructor(public dropdownSelectPhoneCodeService: DropdownSelectPhoneCodeService) {
        this.phoneCodeId = 0;
        this.phoneCodeIdSelected = new EventEmitter<number>();
        this.selectedPhoneCodePosition = 0;
    }

    ngOnInit(): void {
        this._loadPhoneCodes();
    }

    /**
     * Click event to select the phone code
     * @param selectedPhoneCodePosition Selected phone code position
     */
    onClickSelectPhoneCode(selectedPhoneCodePosition: number): void {
        this.selectedPhoneCodePosition = selectedPhoneCodePosition;
        const selectedPhoneCodeId: number = this.dropdownSelectPhoneCodeService.phoneCodes[selectedPhoneCodePosition].phoneCodeId;
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
