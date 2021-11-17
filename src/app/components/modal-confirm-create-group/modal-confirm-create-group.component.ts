import { Component, EventEmitter, Input, Output } from '@angular/core';

import { AlertHelper } from '@helpers/alert.helper';
import { LoadingService } from '@services/loading.service';

import { ModalConfirmCreateGroupService } from './modal-confirm-create-group.service';

declare var ModalPlugin: any;

@Component({
  selector: 'agt-modal-confirm-create-group',
  templateUrl: './modal-confirm-create-group.component.html',
  styles: [
  ],
  providers: [ModalConfirmCreateGroupService]
})
export class ModalConfirmCreateGroupComponent {
    @Input() modalId: string = '';
    @Input() groupName: string = '';
    @Input() ignoreMatches: boolean = false;
    @Output() groupCreated: EventEmitter<void> = new EventEmitter<void>();

    constructor(
        private _loadingService: LoadingService,
        private _modalConfirmCreateGroupService: ModalConfirmCreateGroupService
    ) { }

    get model(): ModalConfirmCreateGroupService {
        return this._modalConfirmCreateGroupService;
    }

    createGroup(): void {
        this._loadingService.show();
        ModalPlugin.hide(this.modalId);
        this.model.createGroup(this.groupName, this.ignoreMatches).subscribe(() => {
            this._loadingService.hide();
            AlertHelper.groupCreated();
            this.groupCreated.emit();
        });
    }

}
