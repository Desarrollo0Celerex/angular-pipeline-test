import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RewriteField } from '@interfaces/rewrite-field.interface';
import { GenderNamePipe } from '@shared/pipes/gender-name.pipe';
import { PhoneCodePipe } from '@shared/pipes/phone-code.pipe';

@Component({
    selector: 'agt-modal-select-contact-fields-to-rewrite',
    templateUrl: './modal-select-contact-fields-to-rewrite.component.html',
    styles: [],
})
export class ModalSelectContactFieldsToRewriteComponent {
    @Input() contactFieldsToRewrite: RewriteField[] = [];
    @Output() fieldsSelected = new EventEmitter<string[]>();
    modalId = 'agt-policy-select-contact-fields-to-rewrite';

    constructor(
        private _genderNamePipe: GenderNamePipe,
        private _phoneCodePipe: PhoneCodePipe
    ) {}

    filterFields(): void {
        const selectedFields: string[] = [];
        this.contactFieldsToRewrite.forEach((field: RewriteField) => {
            if (field.canRewrite) {
                selectedFields.push(field.fieldKey);
            }
        });
        this.fieldsSelected.emit(selectedFields);
    }

    formatValue(fieldKey: string, value: string): string {
        switch (fieldKey) {
            case 'genderId':
                value = this._genderNamePipe.transform(value);
                break;

            case 'phoneCodeId':
                value = this._phoneCodePipe.transform(value);
                break;
        }
        return value;
    }

    updateFieldStatus(event: any, index: number) {
        this.contactFieldsToRewrite[index].canRewrite = event.target.checked;
    }
}
