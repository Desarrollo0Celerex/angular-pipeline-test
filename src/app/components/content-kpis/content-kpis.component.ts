import { Component, OnInit } from '@angular/core';

import { ContentKpisService } from './content-kpis.service';

@Component({
  selector: 'agt-content-kpis',
  templateUrl: './content-kpis.component.html',
  styles: [
  ]
})
export class ContentKpisComponent implements OnInit {

    constructor(public contentKpisService: ContentKpisService) { }

    ngOnInit(): void {
    }

}
