import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { environment } from '@env/environment';
import { ROUTES_NAME } from '@constants/routes-name';
import { AlertHelper } from '@helpers/alert.helper';
import { AuthService } from '@services/auth.service';
import { LoadingService } from '@services/loading.service';
import { StorageService } from '@services/storage.service';

declare let plupload: any;

const ERROR_FILE_SIZE = -600;

@Component({
  selector: 'agt-file-uploader',
  template: '',
  styles: [
  ]
})
export class FileUploaderComponent implements OnInit {
    @Input() contactId: string = '';
    @Input() policyId: string = '';
    @Input() allowedFileExtensions: string[] = [];
    @Input() maxFileSize: string = '';
    @Output() fileSelected: EventEmitter<string> = new EventEmitter<string>();
    uploader: any;
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
        const allowedFileExtensions: string = this.allowedFileExtensions.join(',');
        console.log('this.maxFileSize: ',this.maxFileSize);
        
        this.uploader = new plupload.Uploader({
            runtimes : 'html5',
            browse_button : 'agt-file-container',
            url : environment.apiUrl + '/workspaces/'+this._workspaceId+'/contacts/'+this.contactId+'/policies/'+this.policyId+'/upload-file',
            chunk_size: '1mb',
            multi_selection: false,
            filters: {
                max_file_size : this.maxFileSize,
                mime_types: [{ 
                    title: 'Allowed File Extensions', 
                    extensions: allowedFileExtensions 
                }]
            },
            headers: {
                Authorization: `Bearer ${userToken}`
            },
            init: {
                FilesAdded: (up: any, files: any) => {
                    plupload.each(files, (file: any) => {
                        const baseFile: File = file.getSource().getSource();
                        this._setFilePreview(baseFile);
                        this.fileSelected.emit('1');
                    });
                },
                UploadComplete: (up: any, files: any) => {
                    this._loadingService.hide();
                    AlertHelper.policyUploaded(this._goToCompletePolicy, this);
                },
                Error: (up: any, err: any) => {
                    this._handleError(err);
                }
            }
        });
        this.uploader.init();
    }

    private _goToCompletePolicy(context: FileUploaderComponent): void {
        context._router.navigateByUrl(ROUTES_NAME.completePolicy(context.contactId, context.policyId));
    }

    private _handleError(error: any): void {
        switch (error.code) {
            case ERROR_FILE_SIZE:
                const baseFile: File = error.file.getSource();
                this._setFilePreview(baseFile);
                break;
        
            default:
                console.error('fileError: ', error);
                break;
        }
        
        this.fileSelected.emit('');
        this._loadingService.hide();           
    }

    private _setFilePreview(file: File): void {
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        const fileInput: any = document.getElementById('dropify');
        fileInput.files = dataTransfer.files;
        fileInput.dispatchEvent(new Event('change'))
        // Help Safari out
        if (fileInput.webkitEntries.length) {
            fileInput.dataset.file = `${dataTransfer.files[0].name}`;
        }
    }

}
