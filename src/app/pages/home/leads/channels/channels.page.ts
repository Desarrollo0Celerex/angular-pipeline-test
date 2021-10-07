import { Component, OnInit } from '@angular/core';

import { ChannelsService } from './channels.service';

@Component({
  selector: 'agt-channels',
  templateUrl: './channels.page.html',
  styles: [
  ],
  providers: [ChannelsService]
})
export class ChannelsPage implements OnInit {

    constructor(private _channelsService: ChannelsService) { }

    ngOnInit(): void {
    }

    get model(): ChannelsService {
        return this._channelsService;
    }

}
