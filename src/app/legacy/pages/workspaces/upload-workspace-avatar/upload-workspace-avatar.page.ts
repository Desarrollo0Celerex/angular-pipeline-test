import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ImageCroppedEvent } from 'ngx-image-cropper';

import { FILE_TYPES, IMAGE_FORMATS } from '@constants/global';
import { ROUTES_NAME } from '@constants/routes-name';
import { AlertHelper } from '@helpers/alert.helper';
import { HttpResponse } from '@interfaces/http-response.interface';
import { LoadingService } from '@services/loading.service';

import { UploadWorkspaceAvatarService } from './upload-workspace-avatar.service';

declare var DropifyPlugin: any;

@Component({
  selector: 'agt-upload-workspace-avatar',
  templateUrl: './upload-workspace-avatar.page.html',
  styles: [
  ]
})
export class UploadWorkspaceAvatarPage implements OnInit {
    imageChangedEvent: any;
    isPreviewLoaded: boolean;
    private _canShowPreview: boolean;
    private _croppedImage: any;

    constructor(
        private _uploadWorkspaceAvatarService: UploadWorkspaceAvatarService,
        private _router: Router,
        private _loadingService: LoadingService
    ) {
        this.imageChangedEvent = null;
        this.isPreviewLoaded = false;
        this._canShowPreview = false;
        this._croppedImage = null;
    }

    ngOnInit(): void {
        DropifyPlugin.init(IMAGE_FORMATS, this._canShowPreview);
    }

    /**
     * Change event to load the image preview
     * @param event Event
     */
    onChangeImage(event: any): void {
        this.isPreviewLoaded = true;
        this.imageChangedEvent = event;
    }

    /**
     * Image cropped event to get the cropped image.
     * @param event Event
     */
    onImageCropped(event: ImageCroppedEvent): void {
        this._croppedImage = event.base64;
    }

    /**
     * Load image failed event to catch any error while loading the image preview
     */
    onLoadImageFailed(): void {
        this.isPreviewLoaded = false;
    }

    /**
     * Click event to request upload image
     */
    onClickUploadImage(): void {
        this._uploadWorkspaceAvatar(this._croppedImage);
    }

    /**
     * Click event to select a new image
     */
    onClickCancel(): void {
        this.isPreviewLoaded = false;
    }

    /**
     * Click event to skip step
     */
    onClickSkipStep(): void {
        this._uploadWorkspaceAvatar(null);
    }

    /**
     * Upload the workspace avatar
     * @param image Image to upload
     */
    private _uploadWorkspaceAvatar(image: string | null): void {
        this._loadingService.show();
        this._uploadWorkspaceAvatarService.uploadWorkspaceAvatar(image).subscribe( (res: HttpResponse) => {
            this._loadingService.hide();
            const hasImage: boolean = (!!image) ? true : false;
            this._handleWorkspaceAvatarUploaded(hasImage);
        })
    }

    /**
     * Handle the workspace avatar uploaded with success
     * @param hasImage  Flag has image
     */
    private _handleWorkspaceAvatarUploaded(hasImage: boolean | null): void {
        if(hasImage) {
            AlertHelper.workspaceAvatarUploaded(this._goToActivateWorkspace, this);
        } else {
            this._goToActivateWorkspace(this);
        }
    }

    /**
     * Navigates to activate workspace
     * @param context App context
     */
    private _goToActivateWorkspace(context: any): void {
        context._router.navigateByUrl(ROUTES_NAME.activateWorkspace);
    }

}
