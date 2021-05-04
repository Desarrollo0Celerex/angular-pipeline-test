import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

declare var ModalPlugin: any;
declare var StatsPlugin: any;

@Component({
  selector: 'agt-resume',
  templateUrl: './resume.page.html',
  styles: [
  ]
})
export class ResumePage implements OnInit {
    contactId: string;
    contactSavedModalId: string;

    constructor(private _activatedRoute: ActivatedRoute) {
        this.contactId = '';
        this.contactSavedModalId = 'modal-contact-saved';
    }

    ngOnInit(): void {
        StatsPlugin.init();
        this._catchParams();
        if(this._checkIsContactSaved()) {
            setTimeout(() => {
                ModalPlugin.show(this.contactSavedModalId);
            },0);
        }
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
        return !!history.state.contactSaved;
    }

}
