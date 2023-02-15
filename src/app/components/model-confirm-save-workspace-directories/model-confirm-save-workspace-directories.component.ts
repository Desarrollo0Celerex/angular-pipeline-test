import { Component, Input, Output, EventEmitter } from '@angular/core';

declare var ModalPlugin: any;

@Component({
  selector: 'agt-model-confirm-save-workspace-directories',
  templateUrl: './model-confirm-save-workspace-directories.component.html',
  styles: [
  ]
})
export class ModelConfirmSaveWorkspaceDirectoriesComponent {
    @Input() modalId: string = '';
    @Output() confirmedAction: EventEmitter<void> = new EventEmitter<void>();

    confirmAction(): void {
        ModalPlugin.hide(this.modalId);
        this.confirmedAction.emit();
    }

}
