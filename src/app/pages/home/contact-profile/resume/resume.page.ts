import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ROUTES_NAME } from '@constants/routes-name';

import { ResumeService } from './resume.service';

declare var ModalPlugin: any;
declare var PopoverPlugin: any;

@Component({
  selector: 'agt-resume',
  templateUrl: './resume.page.html',
  styles: [
  ]
})
export class ResumePage implements OnInit, OnDestroy {
    ROUTES_NAME: any = ROUTES_NAME;
    contactId: string;
    modalIdContactSaved: string;
    paramsSub: any | null = null;

    constructor(
        public resumeService: ResumeService,
        private _activatedRoute: ActivatedRoute
    ) {
        this.contactId = '';
        this.modalIdContactSaved = 'modal-contact-saved';
    }

    ngOnInit(): void {
        PopoverPlugin.init();
        this._catchParams();
        if(this._checkIsContactSaved()) {
            setTimeout(() => {
                ModalPlugin.show(this.modalIdContactSaved);
            },0);
        }
    }

    ngOnDestroy(): void {
        if(this.paramsSub) this.paramsSub.unsubscribe();
    }

    getConversionRate(): void {

    }

    /**
     * Catch the params
     */
    private _catchParams(): void {
        this.paramsSub = this._activatedRoute.paramMap.subscribe((res: any) => {
            this.contactId = res.get('contactId');
            this._init();
        });
    }

    /**
     * Check if a contact was saved
     * @return True if it was, otherwise false
     */
    private _checkIsContactSaved(): boolean {
        return (!!history.state.contactSaved) ? true : false;
    }

    private _init(): void {
        this._loadTotalQuotations();
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
