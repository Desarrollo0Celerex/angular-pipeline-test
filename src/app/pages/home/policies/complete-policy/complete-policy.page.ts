import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CompletePolicyService } from './complete-policy.service';

declare var ModalPlugin: any;

@Component({
  selector: 'agt-complete-policy',
  templateUrl: './complete-policy.page.html',
  styles: [
  ]
})
export class CompletePolicyPage implements OnInit {
    contactId: string;
    message: string;
    policyId: string;
    policyIsLoaded: boolean;
    showPolicyModalId: string;

    constructor(
        public completePolicyService: CompletePolicyService,
        private _activatedRoute: ActivatedRoute
    ) {
        this.contactId = '';
        this.message = 'Verfica los datos para la nueva póliza de';
        this.policyId = '';
        this.policyIsLoaded = false;
        this.showPolicyModalId = 'agt-show-policy'
    }

    ngOnInit(): void {
        this._catchParams();
        this._loadContactPolicy();
    }

    /**
     * Click event to show modal
     */
    onClickShowPolicy(): void {
        ModalPlugin.show(this.showPolicyModalId);
    }

    /**
     * Catch the params
     */
    private _catchParams(): void {
        this.contactId = this._activatedRoute.snapshot.params.contactId;
        this.policyId = this._activatedRoute.snapshot.params.policyId;
    }

    /**
     * Load the contact policy
     */
    private _loadContactPolicy(): void {
        this.policyIsLoaded = false;
        this.completePolicyService.loadContactPolicy(this.contactId, this.policyId).subscribe( () => {
            this.policyIsLoaded = true;
        })
    }

}
