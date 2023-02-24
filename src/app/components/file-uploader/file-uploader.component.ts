import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { environment } from '@env/environment';
import { ROUTES_NAME } from '@constants/routes-name';
import { AlertHelper } from '@helpers/alert.helper';
import { AuthService } from '@services/auth.service';
import { LoadingService } from '@services/loading.service';
import { StorageService } from '@services/storage.service';

declare let plupload: any;

@Component({
  selector: 'agt-file-uploader',
  templateUrl: './file-uploader.component.html',
  styles: [
  ]
})
export class FileUploaderComponent implements OnInit {
    @Input() contactId: string = '';
    @Input() policyId: string = '';
    @Input() extensions: string[] = [];
    @Output() fileSelected: EventEmitter<File> = new EventEmitter<File>();
    uploader: any;
    fileList: any[] = [];
    private _pluploadSrc: string = 'https://cdnjs.cloudflare.com/ajax/libs/plupload/3.1.5/plupload.full.min.js';
    private _workspaceId: string = this._authService.workspaceId;

    constructor(
        private _authService: AuthService,
        private _loadingService: LoadingService,
        private _router: Router,
        private _storageService: StorageService
    ) { }

    ngOnInit(): void {
        this._loadPluploadScript().then(() => {
            this.initPlupload();
        });
    }

    uploadFile(insurerId: string): void {
        this._loadingService.show();
        this.uploader.settings.multipart_params["insurerId"] = insurerId;
        this.uploader.start();
    }

    private _loadPluploadScript(): Promise<void> {
        return new Promise((resolve) => {
            const id = 'plupload-sdk';
            if (document.getElementById(id)) {
                resolve();
            }
            let js, fjs = document.getElementsByTagName('script')[0];
            js = document.createElement('script'); 
            js.id = id;
            js.src = this._pluploadSrc;
            fjs.parentNode!.insertBefore(js, fjs);
            // Wait until the library is loaded
            this._waitUntilScripLoaded(resolve);
        });
    }

    private _waitUntilScripLoaded(resolve: any): void {
        const windowAux: any = window;
        setTimeout(() => {
            if(!(!!windowAux.plupload)) {
                this._waitUntilScripLoaded(resolve);
            } else {
                resolve();
            }
        }, 0);
    }

    initPlupload() {
        const userToken: string | null = this._storageService.getUserToken();
        const extensions: string = this.extensions.join(',');
        console.log('extensions: ',extensions);
        
        this.uploader = new plupload.Uploader({
            runtimes : 'html5',
            drop_element: 'pick',
            browse_button : 'pick',
            url : environment.apiUrl + '/workspaces/'+this._workspaceId+'/contacts/'+this.contactId+'/policies/'+this.policyId+'/upload-file',
            chunk_size: '1mb',
            multi_selection: false,
            filters: {
                max_file_size : '10mb',
                mime_types: [
                    { title: 'File Types', extensions }
                ]
            },
            headers: {
                Authorization: `Bearer ${userToken}`
            },
            init: {
                PostInit: () => {
                    this.fileList = [];
                },
                FilesAdded: (up: any, files: any) => {
                    plupload.each(files, (file: any) => {
                        const fileAux: File = file.getSource().getSource();
                        this.fileSelected.emit(fileAux);
                        this.fileList.push({
                            id: file.id,
                            name: file.name,
                            size: plupload.formatSize(file.size),
                            percent: 0
                        });
                    });
                },
                UploadProgress: (up: any, file: any) => {
                    const index = this.fileList.findIndex(f => f.id == file.id);
                    this.fileList[index].percent = file.percent;
                },
                UploadComplete: (up: any, files: any) => {
                    this._loadingService.hide();
                    AlertHelper.policyUploaded(this._goToCompletePolicy, this);
                },
                Error: (up: any, err: any) => {
                    console.error(err);
                    this._loadingService.hide();
                }
            }
        });
        this.uploader.init();
    }

    private _goToCompletePolicy(context: FileUploaderComponent): void {
        context._router.navigateByUrl(ROUTES_NAME.completePolicy(context.contactId, context.policyId));
    }

}
