import { Component, OnInit } from '@angular/core';

import { LeadsService } from './leads.service';

@Component({
    selector: 'agt-leads',
    templateUrl: './leads.layout.html',
    styles: [],
    providers: [LeadsService],
    standalone: false
})
export class LeadsLayout implements OnInit {

    constructor(private _leadsService: LeadsService) { }

    ngOnInit(): void {
        this._loadLeadKpis();
    }

    get model(): LeadsService {
        return this._leadsService;
    }

    private _loadLeadKpis(): void {
        this.model.getTotalLeads().subscribe((totalLeads: number) => {
            console.log('totalLeads: ',totalLeads);
        })
    }

}
