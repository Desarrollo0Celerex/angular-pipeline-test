import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ROUTES_NAME } from '@constants/routes-name';

import { GroupProfileService } from './group-profile.service';

declare var ModalPlugin: any;

@Component({
  selector: 'agt-group-profile',
  templateUrl: './group-profile.layout.html',
  styles: [
  ],
  providers: [GroupProfileService]
})
export class GroupProfileLayout implements OnInit, OnDestroy {
    ROUTES_NAME: any = ROUTES_NAME;
    groupId: string = '';
    modalIdSearchClient: string = 'gp-modal-client';
    modalIdShowGroupDetails: string = 'gp-modal-show-group-details';
    modalIdUpdateGroup: string = 'gp-modal-update-group';
    private _subParams: any;

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _groupProfileService: GroupProfileService
    ) { }

    ngOnInit(): void {
        this._catchParams();
    }

    ngOnDestroy(): void {
        if(this._subParams) this._subParams.unsubscribe();
    }

    get model(): GroupProfileService {
        return this._groupProfileService;
    }

    showModalGroupDetails(): void {
        ModalPlugin.show(this.modalIdShowGroupDetails);
    }

    showModalToSeachClient(): void {
        ModalPlugin.show(this.modalIdSearchClient);
    }

    showModalUpdateGroup(): void {
        ModalPlugin.show(this.modalIdUpdateGroup);
    }

    updateGroupName(name: string): void {
        this.model.group!.name = name;
    }

    /**
     * Catch the params
     */
    private _catchParams(): void {
        if(!!this._activatedRoute.firstChild) {
            this._subParams = this._activatedRoute.firstChild.paramMap.subscribe((res: any) => {
                this.groupId = res.get('groupId');
                this.model.loadGroup(this.groupId);
            });
        }
    }

}
