import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import {
    DEFAULT_COUNTRY_ID,
    EMAIL_LENGTH,
    WORKSPACE_DIRECTORY_TYPES,
} from '@constants/global';
import { ValidatorsHelper } from '@core/helpers/validators.helper';
import { WorkspaceDirectory } from '@interfaces/workspace-directory.interface';
import { Workspace } from '@core/interfaces/workspace.interface';
import { WorkspaceService } from '@core/services/workspace/workspace.service';
import { WorkspaceDirectoryService } from '@services/workspace-directory.service';
import { HttpResponse } from '@core/interfaces/http-response.interface';
import { UtilitiesHelper } from '@core/helpers/utilities.helper';
import { SaveWorkspaceDirectoriesDataSend } from '@interfaces/save-workspace-directories-data-send.interface';

@Injectable()
export class AdvisoryService {
    form: FormGroup = this._formBuilder.group({
        workspaceDirectories: this._formBuilder.array([]),
    });
    isBuiltForm: boolean = false;
    workspace: Workspace | null = null;
    private _workspaceDirectoryTypeId: number =
        WORKSPACE_DIRECTORY_TYPES.ADVISORY;

    constructor(
        private _formBuilder: FormBuilder,
        private _workspaceService: WorkspaceService,
        private _workspaceDirectoryService: WorkspaceDirectoryService
    ) {}

    get workspaceDirectories(): FormArray {
        return this.form.get('workspaceDirectories') as FormArray;
    }

    addDirectory(directory: WorkspaceDirectory | null = null): void {
        this.workspaceDirectories.push(this.newDirectory(directory));
    }

    buildForm(workspaceDirectories: WorkspaceDirectory[]): void {
        if (workspaceDirectories.length > 0) {
            for (let directory of workspaceDirectories) {
                this.addDirectory(directory);
            }
        } else {
            this.addDirectory();
        }
        this.isBuiltForm = true;
    }

    loadWorkspace(): Observable<void> {
        const fields: string = 'countryId';
        return this._workspaceService.getWorkspace(fields).pipe(
            tap((res: Workspace) => {
                this.workspace = res;
            }),
            map(() => {})
        );
    }

    loadWorkspaceDirectories(): Observable<WorkspaceDirectory[]> {
        const fields: string =
            'workspaceDirectoryId,email,whatsappCodeId,whatsappNumber,phoneCodeId,phoneNumber';
        const filters: string = UtilitiesHelper.generateHttpFilter(
            'workspaceDirectoryTypeId',
            [this._workspaceDirectoryTypeId]
        );
        return this._workspaceDirectoryService.getWorkspaceDirectories(
            fields,
            filters
        );
    }

    newDirectory(directory: WorkspaceDirectory | null): FormGroup {
        const codeId: number =
            this.workspace !== null &&
            typeof this.workspace.countryId != 'undefined'
                ? this.workspace.countryId
                : DEFAULT_COUNTRY_ID;
        return this._formBuilder.group({
            workspaceDirectoryId: [
                !!directory && !!directory.workspaceDirectoryId
                    ? directory.workspaceDirectoryId
                    : '',
            ],
            email: [
                !!directory && !!directory.email ? directory.email : '',
                [
                    Validators.required,
                    Validators.email,
                    Validators.minLength(EMAIL_LENGTH.MIN),
                    Validators.maxLength(EMAIL_LENGTH.MAX),
                ],
            ],
            whatsappCodeId: [
                !!directory && !!directory.whatsappCodeId
                    ? directory.whatsappCodeId
                    : codeId,
                [Validators.required, ValidatorsHelper.number],
            ],
            whatsappNumber: [
                !!directory && !!directory.whatsappNumber
                    ? directory.whatsappNumber
                    : '',
                [Validators.required, ValidatorsHelper.phoneNumber],
            ],
            phoneCodeId: [
                !!directory && !!directory.phoneCodeId
                    ? directory.phoneCodeId
                    : codeId,
                [Validators.required, ValidatorsHelper.number],
            ],
            phoneNumber: [
                !!directory && !!directory.phoneNumber
                    ? directory.phoneNumber
                    : '',
                [Validators.required, ValidatorsHelper.phoneNumber],
            ],
        });
    }

    saveWorkspaceDirectories(): Observable<void> {
        const requestBody: SaveWorkspaceDirectoriesDataSend = {
            workspaceDirectoryTypeId: this._workspaceDirectoryTypeId,
            workspaceDirectories: this.workspaceDirectories.value,
        };
        return this._workspaceDirectoryService.saveWorkspaceDirectories(
            requestBody
        );
    }
}
