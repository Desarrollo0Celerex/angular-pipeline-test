import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Client } from '@interfaces/client.interface';

declare var ModalPlugin: any;

@Component({
  selector: 'agt-modal-select-client',
  templateUrl: './modal-select-client.component.html',
  styles: [
  ]
})
export class ModalSelectClientComponent {
    @Input() modalId: string = '';
    @Input() groupMembers: string[] = [];
    @Input() clients: Client[] = [];
    @Output() clientSelected: EventEmitter<Client> = new EventEmitter<Client>();

    canAddMember(contactId: string): boolean {
        return this.groupMembers.includes(contactId) ? false : true;
    }

    selectClient(client: Client): void {
        ModalPlugin.hide(this.modalId);
        this.clientSelected.emit(client);
    }

}
