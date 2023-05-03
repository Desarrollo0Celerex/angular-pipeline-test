import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    Output,
} from '@angular/core';
import { DumbComponent } from '@core/classes/dumb-component';

@Component({
    selector: 'agt-card-content-no-results',
    templateUrl: './card-content-no-results.component.html',
    styles: [],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardContentNoResultsComponent extends DumbComponent {
    @Input() details: string = '';
    @Input() message: string = '';
    @Output() doAction: EventEmitter<void> = new EventEmitter<void>();

    constructor() {
        super();
    }

    requestDoAction(): void {
        this.doAction.emit();
    }
}
