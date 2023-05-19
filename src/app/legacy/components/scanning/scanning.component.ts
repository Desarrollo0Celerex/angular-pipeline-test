import { Component } from '@angular/core';

import { ScanningService } from '@services/scanning.service';

declare var ModalPlugin: any;

@Component({
  selector: 'agt-scanning',
  templateUrl: './scanning.component.html',
  styles: [
  ]
})
export class ScanningComponent {
    modalId: string = 'agt-scanning';

    constructor(private _scanningService: ScanningService) {
        this._scanningService.isScanning.subscribe( (status: boolean) => {
            this._toggleScanning(status);
        })
    }

    /**
     * Toggle the scanning
     * @param status The scanning status
     */
    private _toggleScanning(status: boolean): void {
        if(status) {
            ModalPlugin.show(this.modalId);
        } else {
            ModalPlugin.hide(this.modalId);
        }
    }

}
