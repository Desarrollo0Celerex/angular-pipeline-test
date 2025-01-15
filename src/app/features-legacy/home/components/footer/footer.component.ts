import { Component } from '@angular/core';

@Component({
    selector: 'agt-footer',
    templateUrl: './footer.component.html',
    styles: [],
    standalone: false
})
export class FooterComponent {
    currentYear: number = new Date().getFullYear();
}
