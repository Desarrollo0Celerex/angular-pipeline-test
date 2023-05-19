import { Component } from '@angular/core';

declare var ModalPlugin: any;

@Component({
  selector: 'agt-dashboard',
  templateUrl: './dashboard.page.html',
  styles: [
  ]
})
export class DashboardPage {
    modalIdSelectContactType: string = 'agt-select-contact-type';

    showModalToSelectContactType(): void {
        ModalPlugin.show(this.modalIdSelectContactType);
    }
}
