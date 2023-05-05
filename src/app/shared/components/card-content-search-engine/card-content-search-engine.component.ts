import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'agt-card-content-search-engine',
    templateUrl: './card-content-search-engine.component.html',
    styles: [],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardContentSearchEngineComponent {
    @Input() title: string = '';
    @Input() placeholder: string = '';
    @Output() searchContent: EventEmitter<string> = new EventEmitter<string>();
    form: FormGroup = this._buildForm();

    constructor(private _formBuilder: FormBuilder) {}

    requestSearchContent(): void {
        if (this.form.valid) {
            this.searchContent.emit(this.form.controls.query.value);
        }
    }

    private _buildForm(): FormGroup {
        return this._formBuilder.group({
            query: [
                '',
                [
                    Validators.required,
                    Validators.minLength(1),
                    Validators.maxLength(50),
                    //ValidatorsHelper.freeText,
                ],
            ],
        });
    }
}
