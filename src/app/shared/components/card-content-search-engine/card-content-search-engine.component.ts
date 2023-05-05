import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsHelper } from '@core/helpers/validators.helper';

@Component({
    selector: 'agt-card-content-search-engine',
    templateUrl: './card-content-search-engine.component.html',
    styles: [],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardContentSearchEngineComponent implements OnChanges {
    @Input() title: string = '';
    @Input() placeholder: string = '';
    @Input() query: string = '';
    @Input() totalResults: number | undefined = undefined;
    @Output() searchContent: EventEmitter<string> = new EventEmitter<string>();
    form: FormGroup = this._buildForm();
    queryLabel: string = '';

    constructor(private _formBuilder: FormBuilder) {}

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.query && changes.query.currentValue) {
            this._updateFormQuery(changes.query.currentValue);
        }
    }

    get canShowResults(): boolean {
        return typeof this.totalResults !== 'undefined';
    }

    get resultsLabel(): string {
        return this.totalResults === 1 ? 'ha' : 'han';
    }

    requestSearchContent(): void {
        if (this.form.valid) {
            this.queryLabel = this.form.controls.query.value;
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
                    Validators.maxLength(100),
                    ValidatorsHelper.freeText,
                ],
            ],
        });
    }

    private _updateFormQuery(query: string): void {
        this.queryLabel = query;
        this.form.controls.query.setValue(query);
    }
}
