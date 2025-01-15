import { Component, Input } from '@angular/core';

@Component({
    selector: 'agt-total-policy-complements',
    templateUrl: './total-policy-complements.component.html',
    styles: [],
    standalone: false
})
export class TotalPolicyComplementsComponent {
    @Input() totalPolicyComplements = 0;
}
