import {
    Input,
    Component,
    AfterViewChecked,
    ChangeDetectionStrategy,
    AfterViewInit,
} from '@angular/core';
import { DumbComponent } from '@core/classes/dumb-component';

declare var PopoverPlugin: any;

@Component({
    selector: 'agt-card-content-title',
    templateUrl: './card-content-title.component.html',
    styles: [],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class CardContentTitleComponent
    extends DumbComponent
    implements AfterViewInit
{
    @Input() description: string = '';
    @Input() title: string = '';

    constructor() {
        super();
    }

    ngAfterViewInit(): void {
        if (this.description) {
            PopoverPlugin.init();
        }
    }
}
