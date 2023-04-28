import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AlertHelper } from '@helpers/alert.helper';
import { ROUTES_NAME } from '@constants/routes-name';
import { LoadingService } from '@core/services/loading/loading.service';

import { GroupProfileService } from './group-profile.service';

declare var ModalPlugin: any;

@Component({
    selector: 'agt-group-profile',
    templateUrl: './group-profile.layout.html',
    styles: [],
    providers: [GroupProfileService],
})
export class GroupProfileLayout implements OnInit, OnDestroy {
    ROUTES_NAME: any = ROUTES_NAME;
    groupId: string = '';
    modalIdAddGroupMember: string = 'gp-modal-add-group-member';
    modalIdConfirmDeleteGroup: string = 'gp-modal-confirm-delete-group';
    modalIdConfirmAddClient: string = 'gp-modal-confirm-add-client';
    modalIdSearchClient: string = 'gp-modal-client';
    modalIdSelectClient: string = 'gp-modal-select-client';
    modalIdShowGroupDetails: string = 'gp-modal-show-group-details';
    modalIdUpdateGroup: string = 'gp-modal-update-group';
    private _subParams: any;

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _groupProfileService: GroupProfileService,
        private _loadingService: LoadingService,
        private _router: Router
    ) {}

    ngOnInit(): void {
        this._catchParams();
    }

    ngOnDestroy(): void {
        if (this._subParams) this._subParams.unsubscribe();
    }

    get model(): GroupProfileService {
        return this._groupProfileService;
    }

    deleteGroup(): void {
        this._loadingService.show();
        this.model.deleteGroup(this.groupId).subscribe(() => {
            this._router.navigateByUrl(ROUTES_NAME.listGroups);
            this._loadingService.hide();
            AlertHelper.groupDeleted();
        });
    }

    showModalAddGroupMember(): void {
        ModalPlugin.show(this.modalIdAddGroupMember);
    }

    showModalConfirmDeleteGroup(): void {
        ModalPlugin.show(this.modalIdConfirmDeleteGroup);
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
        if (!!this._activatedRoute.firstChild) {
            this._subParams =
                this._activatedRoute.firstChild.paramMap.subscribe(
                    (res: any) => {
                        this.groupId = res.get('groupId');
                        this.model.loadGroup(this.groupId);
                    }
                );
        }
    }
}
