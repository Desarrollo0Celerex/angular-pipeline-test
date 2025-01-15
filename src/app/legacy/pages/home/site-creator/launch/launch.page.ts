import { Component, OnInit } from '@angular/core';

import { LaunchService } from './launch.service';

@Component({
    selector: 'agt-launch',
    templateUrl: './launch.page.html',
    styles: [],
    providers: [LaunchService],
    standalone: false
})
export class LaunchPage implements OnInit {

    constructor(public model: LaunchService) { }

    ngOnInit(): void {
        this.model.loadSite();
    }

}
