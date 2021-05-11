import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ROUTES_NAME } from '@constants/routes-name';

import { ResumeService } from './resume.service';

declare var ModalPlugin: any;
declare var StatsPlugin: any;
declare var PopoverPlugin: any;

@Component({
  selector: 'agt-resume',
  templateUrl: './resume.page.html',
  styles: [
  ]
})
export class ResumePage implements OnInit {
    ROUTES_NAME: any = ROUTES_NAME;
    contactId: string;
    modalIdContactSaved: string;

    constructor(
        public resumeService: ResumeService,
        private _activatedRoute: ActivatedRoute
    ) {
        this.contactId = '';
        this.modalIdContactSaved = 'modal-contact-saved';
    }

    ngOnInit(): void {
        PopoverPlugin.init();
        StatsPlugin.init();
        this._catchParams();
        this._loadTotalQuotations();
        if(this._checkIsContactSaved()) {
            setTimeout(() => {
                ModalPlugin.show(this.modalIdContactSaved);
            },0);
        }
    }

    getConversionRate(): void {

    }

    /**
     * Catch the params
     */
    private _catchParams(): void {
        this.contactId = this._activatedRoute.snapshot.params.contactId;
    }

    /**
     * Check if a contact was saved
     * @return True if it was, otherwise false
     */
    private _checkIsContactSaved(): boolean {
        return (!!history.state.contactSaved) ? true : false;
    }

    private _loadTotalQuotations(): void {
        this.resumeService.loadTotalPendingQuotations(this.contactId).subscribe( () => {
            this.resumeService.loadTotalQuotationsAccepted(this.contactId).subscribe( () => {
                this.resumeService.loadTotalQuotationsRejected(this.contactId).subscribe( () => {
                    this.resumeService.calculateConversionRate();
                })
            });
        });
    }

}
