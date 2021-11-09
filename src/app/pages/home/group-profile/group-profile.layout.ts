import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ROUTES_NAME } from '@constants/routes-name';

import { GroupProfileService } from './group-profile.service';

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
