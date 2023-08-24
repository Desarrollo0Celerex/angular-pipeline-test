import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ModalHelper } from '@core/helpers/modal.helper';
import { RewriteField } from '@policies/interfaces/rewrite-field.interface';
import { SelectContactFieldsToRewrite } from '@policies/interfaces/select-contact-files-to-rewrite.interface';
import { GenderNamePipe } from '@shared/pipes/gender-name.pipe';
import { PhoneCodePipe } from '@shared/pipes/phone-code.pipe';

@Component({
    selector: 'agt-select-contact-fields-to-rewrite',
    templateUrl: './select-contact-fields-to-rewrite.component.html',
    styles: [],
})
export class SelectContactFieldsToRewriteComponent {
    data: SelectContactFieldsToRewrite | undefined = undefined;
    @Output() fieldsSelected = new EventEmitter<string[]>();
    modalId = 'agt-select-contact-fields-to-rewrite';

    constructor(
        private _genderNamePipe: GenderNamePipe,
        private _phoneCodePipe: PhoneCodePipe
    ) {}

    init(data: SelectContactFieldsToRewrite): void {
        this.data = data;
        ModalHelper.show(this.modalId);
    }

    filterFields(): void {
        const selectedFields: string[] = [];
        this.data!.fields.forEach((field: RewriteField) => {
            if (field.canRewrite) {
                selectedFields.push(field.fieldKey);
            }
        });
        this.fieldsSelected.emit(selectedFields);
        this.reset();
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

        if (value === '') {
            value = 'Sin Datos';
        }
        return value;
    }

    reset(): void {
        this.data!.fields = [];
    }

    updateFieldStatus(event: any, index: number) {
        this.data!.fields[index].canRewrite = event.target.checked;
    }
}
