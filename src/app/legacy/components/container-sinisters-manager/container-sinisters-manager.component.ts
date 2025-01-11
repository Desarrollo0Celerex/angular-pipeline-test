import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ROUTES_NAME } from '@constants/routes-name';
import { PolicyDataSend } from '@interfaces/policy-data-send.interface';

declare var ModalPlugin: any;

const SINISTER_ACTIONS: any = {
    SHOW_HISTORY: 1,
    SHOW_OPEN_SINISTERS: 2,
    SHOW_CLOSED_SINISTERS: 3
}

@Component({
    selector: 'agt-container-sinisters-manager',
    templateUrl: './container-sinisters-manager.component.html',
    styles: [],
    standalone: false
})
export class ContainerSinistersManagerComponent implements OnInit {
    @Input() contactId: string = '';
    @Input() policyId: string = '';
    SINISTER_ACTIONS: any = SINISTER_ACTIONS;
    modalIdShowPolicyFile: string = 'csm-show-policy-file';
    modalIdConfirmShowPolicySinisters: string = 'csm-confirm-show-policy-sinisters';
    modalIdConfirmShowPolicyClosedSinisters: string = 'csm-confirm-show-policy-closed-sinisters';
    modalIdConfirmShowPolicyOpenSinisters: string = 'csm-confirm-show-policy-open-sinisters';
    modalIdReportSinister: string = 'csm-report-sinister';
    policyData: PolicyDataSend | null = null;
    selectedSinisterAction: number = 0;

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _router: Router
    ) { }

    ngOnInit(): void {
        this.policyData = {
            contactId: this.contactId,
            policyId: this.policyId
        }
        this._selectSinisterAction();
    }

    goToPolicyHistory(): void {
        this._router.navigateByUrl(ROUTES_NAME.showHistoryPolicy(this.contactId, this.policyId))
    }

    realoadPage(): void {
        this._router.routeReuseStrategy.shouldReuseRoute = () => false;
        this._router.onSameUrlNavigation = 'reload';
        this._router.navigate(['/' + this._router.url], { relativeTo: this._activatedRoute });
    }

    showModalToConfirmShowPolicyHistory(): void {
        if(this.selectedSinisterAction !== SINISTER_ACTIONS.SHOW_HISTORY) {
            ModalPlugin.show(this.modalIdConfirmShowPolicySinisters);
        }
    }

    showModalToConfirmShowPolicyOpenSinisters(): void {
        if(this.selectedSinisterAction !== SINISTER_ACTIONS.SHOW_OPEN_SINISTERS) {
            ModalPlugin.show(this.modalIdConfirmShowPolicyOpenSinisters);
        }
    }

    showModalToConfirmShowPolicyClosedSinisters(): void {
        if(this.selectedSinisterAction !== SINISTER_ACTIONS.SHOW_CLOSED_SINISTERS) {
            ModalPlugin.show(this.modalIdConfirmShowPolicyClosedSinisters);
        }
    }

    private _selectSinisterAction(): void {
        const currentUrl: string = this._router.url;
        if(currentUrl.includes('policy-sinisters')) {
            this.selectedSinisterAction = SINISTER_ACTIONS.SHOW_HISTORY;
        } else if(currentUrl.includes('policy-open-sinisters')) {
            this.selectedSinisterAction = SINISTER_ACTIONS.SHOW_OPEN_SINISTERS;
        } else if(currentUrl.includes('policy-closed-sinisters')) {
            this.selectedSinisterAction = SINISTER_ACTIONS.SHOW_CLOSED_SINISTERS;
        }
    }

}
