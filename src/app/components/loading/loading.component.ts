import { Component, OnInit } from '@angular/core';

import { LoadingService } from '@services/loading.service';

@Component({
  selector: 'agt-loading',
  templateUrl: './loading.component.html',
  styles: [
  ]
})
export class LoadingComponent {
    public isLoading: boolean;

    constructor(private _loadingService: LoadingService) {
        this.isLoading = false;
        this._loadingService.isLoading.subscribe( (status: boolean) => {
            this.isLoading = status;
        })
    }

}
