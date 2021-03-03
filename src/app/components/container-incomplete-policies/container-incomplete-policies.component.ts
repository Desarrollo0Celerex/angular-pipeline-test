import { Component, Input, OnInit } from '@angular/core';

import { POLICY_STATUS } from '@constants/global';

import { ContainerIncompletePoliciesService } from './container-incomplete-policies.service';

@Component({
  selector: 'agt-container-incomplete-policies',
  templateUrl: './container-incomplete-policies.component.html',
  styles: [
  ]
})
export class ContainerIncompletePoliciesComponent implements OnInit {
    @Input() contactId: string;
    @Input() contentTypeName: string;
    contentSubtype: number;

    constructor(public containerListIncompletePoliciesService: ContainerIncompletePoliciesService) {
        this.contactId = '';
        this.contentTypeName = '';
        this.contentSubtype = POLICY_STATUS.INCOMPLETE;
    }

    ngOnInit(): void {
        const page: number = 1;
        this.containerListIncompletePoliciesService.loadIncompletePolicies(this.contactId, page, this.contentSubtype);
    }

}
