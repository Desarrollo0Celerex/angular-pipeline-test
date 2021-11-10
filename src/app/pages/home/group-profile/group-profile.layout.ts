import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ROUTES_NAME } from '@constants/routes-name';
import { AlertHelper } from '@helpers/alert.helper';
import { Client } from '@interfaces/client.interface';
import { LoadingService } from '@services/loading.service';

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
    modalIdSearchClient: string = 'agt-search-client';
    private _subParams: any;

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _groupProfileService: GroupProfileService,
        private _loadingService: LoadingService,
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

    showModalToSeachClient(): void {
        ModalPlugin.show(this.modalIdSearchClient);
    }

    addClient(client: Client): void {
        this._loadingService.show();
        this.model.addGroupMember(this.groupId, client.contactId).subscribe(() => {
            this._loadingService.hide();
            AlertHelper.groupMemberAdded();
        })
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
