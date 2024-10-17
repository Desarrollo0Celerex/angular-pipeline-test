import { Component, Input } from '@angular/core';
import { Insured } from '@interfaces/insured.interface';

@Component({
    selector: 'agt-policy-insured-dependent-form',
    templateUrl: './policy-insured-dependent-form.component.html',
    styles: [],
})
export class PolicyInsuredDependentFormComponent {
    @Input() insuredNumber = 0;
    @Input() insured: Insured | null = null;

    get panelId(): string {
        return 'panel-policy-dependent' + this.insuredNumber;
    }

    get panelCloseId(): string {
        return 'panel-close-policy-dependent' + this.insuredNumber;
    }
}
