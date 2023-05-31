import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DumbComponent } from '@core/classes/dumb-component';

@Component({
    selector: 'agt-card-main-action',
    templateUrl: './card-main-action.component.html',
    styles: [],
})
export class CardMainActionComponent extends DumbComponent {
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
