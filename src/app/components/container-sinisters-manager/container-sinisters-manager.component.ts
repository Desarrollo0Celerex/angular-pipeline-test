import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ROUTES_NAME } from '@constants/routes-name';

declare var ModalPlugin: any;

@Component({
  selector: 'agt-container-sinisters-manager',
  templateUrl: './container-sinisters-manager.component.html',
  styles: [
  ]
})
export class ContainerSinistersManagerComponent {
    @Input() contactId: string = '';
    @Input() policyId: string = '';
    modalIdShowPolicyFile: string = 'csm-show-policy-file';
    modalIdConfirmShowHistoryPolicy: string = 'csm-confirm-show-history-policy';
    modalIdReportSinister: string = 'csm-report-sinister';

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _router: Router
    ) { }

    realoadPage(): void {
        this._router.routeReuseStrategy.shouldReuseRoute = () => false;
        this._router.onSameUrlNavigation = 'reload';
        this._router.navigate(['/' + this._router.url], { relativeTo: this._activatedRoute });
    }

    showModalToShowPolicyFile(): void {
        ModalPlugin.show(this.modalIdShowPolicyFile);
    }

    showModalToConfirmShowPolicyHistory(): void {
        ModalPlugin.show(this.modalIdConfirmShowHistoryPolicy);
    }

    showModalToReportSinister(): void {
        ModalPlugin.show(this.modalIdReportSinister);
    }

}
