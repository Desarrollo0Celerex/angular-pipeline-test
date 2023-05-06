import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DumbComponent } from '@core/classes/dumb-component';

@Component({
    selector: 'agt-card-content-main-action',
    templateUrl: './card-content-main-action.component.html',
    styles: [],
})
export class CardContentMainActionComponent extends DumbComponent {
    @Input() buttonLabel: string = '';
    @Input() title: string = '';
    @Output() doAction: EventEmitter<void> = new EventEmitter<void>();

    constructor() {
        super();
    }

    requestDoAction(): void {
        this.doAction.emit();
    }
}
