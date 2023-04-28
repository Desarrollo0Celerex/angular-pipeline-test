import { Injectable } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { OWN_NAME_LENGTH, CLIENT_STATUS } from '@constants/global';
import { UtilitiesHelper } from '@helpers/utilities.helper';
import { ValidatorsHelper } from '@helpers/validators.helper';
import { AddGroupMemberDataSend } from '@interfaces/add-group-member-data-send.interface';
import { HttpResponse } from '@interfaces/http-response.interface';
import { ClientService } from '@services/client.service';
import { GroupMemberService } from '@services/group-member.service';

@Injectable()
export class ModalSearchClientService {
    form: UntypedFormGroup = this._buildForm();
    groupMembers: string[] = [];

    constructor(
        private _formBuilder: UntypedFormBuilder,
        private _groupMemberService: GroupMemberService,
        private _clientService: ClientService
    ) { }

    get f(): { [key: string]: AbstractControl } {
        return this.form.controls;
    }

    addGroupMember(groupId: string, contactId: string): Observable<void> {
        const requestBody: AddGroupMemberDataSend = { contactId };
        return this._groupMemberService.addGroupMember(groupId, requestBody);
    }

    /**
     * Get the clients
     * @return  The clients
     */
    getClients(): Observable<HttpResponse> {
        const fields: string = 'contactId,contactName,avatarUrl,clientStatusName,clientStatusBackground,contactSourceName,contactScoreName,totalGlobalWallet,totalActivePolicies,currencyName,createdAt';
        const filters: string = UtilitiesHelper.generateHttpFilter('clientStatusId', [CLIENT_STATUS.OCCASIONAL, CLIENT_STATUS.FREQUENT, CLIENT_STATUS.INFLUENTIAL, CLIENT_STATUS.LOST])
        const page: number = 1;
        const perPage: number = 100;
        const query: string = this.f.name.value;
        return this._clientService.getClients(page, fields, filters, query, perPage);
    }

    loadGroupMembers(groupId: string): void {
        const fields: string = 'contactId';
        const page: number = 1;
        const perPage: number = 1000;
        const query: string = '';
        this._groupMemberService.getGroupMembers(groupId, fields, page, query, perPage).subscribe((res: HttpResponse) => {
            for (let member of res.data.items) {
                this.groupMembers.push(member.contactId);
            }
        })
    }


    private _buildForm(): UntypedFormGroup {
        return this._formBuilder.group({
            name: ['', [Validators.required, Validators.minLength(OWN_NAME_LENGTH.MIN), Validators.maxLength(OWN_NAME_LENGTH.MAX), ValidatorsHelper.ownName]]
        });
    }
}
