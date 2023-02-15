import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { DEFAULT_COUNTRY_ID, EMAIL_LENGTH } from '@constants/global';
import { ValidatorsHelper } from '@helpers/validators.helper';
import { WorkspaceDirectory } from '@interfaces/workspace-directory.interface';
import { Workspace } from '@interfaces/workspace.interface';
import { WorkspaceService } from '@services/workspace.service';
import { WorkspaceDirectoryService } from '@services/workspace-directory.service';
import { HttpResponse } from '@interfaces/http-response.interface';

@Injectable()
export class AdvisoryService {
    form: FormGroup = this._formBuilder.group({
        directories: this._formBuilder.array([])
    });
    isBuiltForm: boolean = false;
    workspace: Workspace | null = null;

    constructor(
        private _formBuilder: FormBuilder,
        private _workspaceService: WorkspaceService,
        private _workspaceDirectoryService: WorkspaceDirectoryService
    ) { }

    get directories(): FormArray {
        return this.form.get('directories') as FormArray;
    }

    addDirectory(directory: WorkspaceDirectory | null = null): void {
        this.directories.push(this.newDirectory(directory));
    }

    buildForm(directories: WorkspaceDirectory[]): void {
        if(directories.length > 0) {
            for(let directory of directories) {
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
            tap((res: HttpResponse) => {
                this.workspace = res.data;
            }),
            map(() => { })
        )
    }

    loadWorkspaceDirectories(): Observable<WorkspaceDirectory[]> {
        const fields: string = 'workspaceDirectoryId,email,whatsappCodeId,whatsappNumber,phoneCodeId,phoneNumber';
        return this._workspaceDirectoryService.getWorkspaceDirectories(fields);
    }

    newDirectory(directory: WorkspaceDirectory | null): FormGroup {
        const codeId: number = (this.workspace !== null && typeof this.workspace.countryId != 'undefined') ? this.workspace.countryId : DEFAULT_COUNTRY_ID;
        return this._formBuilder.group({
            workspaceDirectoryId: [(!!directory && !!directory.workspaceDirectoryId) ? directory.workspaceDirectoryId : ''],
            email: [(!!directory && !!directory.email) ? directory.email : '', [Validators.required, Validators.email, Validators.minLength(EMAIL_LENGTH.MIN), Validators.maxLength(EMAIL_LENGTH.MAX)]],
            whatsappCodeId: [(!!directory && !!directory.whatsappCodeId) ? directory.whatsappCodeId : codeId, [Validators.required, ValidatorsHelper.number]],
            whatsappNumber: [(!!directory && !!directory.whatsappNumber) ? directory.whatsappNumber : '', [Validators.required, ValidatorsHelper.phoneNumber]],
            phoneCodeId: [(!!directory && !!directory.phoneCodeId) ? directory.phoneCodeId : codeId, [Validators.required, ValidatorsHelper.number]],
            phoneNumber: [(!!directory && !!directory.phoneNumber) ? directory.phoneNumber : '', [Validators.required, ValidatorsHelper.phoneNumber]],
        });
    }
}
