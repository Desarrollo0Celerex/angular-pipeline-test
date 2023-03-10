import { Component, OnInit } from '@angular/core';

import { ROUTES_NAME } from '@constants/routes-name';

import { ResumeService } from './resume.service';

@Component({
  selector: 'agt-resume',
  templateUrl: './resume.page.html',
  styles: [
  ]
})
export class ResumePage implements OnInit {
    ROUTES_NAME: any = ROUTES_NAME;

    constructor(public model: ResumeService) { }

    ngOnInit(): void {
        this.model.loadSite();
    }

    get logoUrl(): string {
        const logoUrl: string = (this.model.site !== null && this.model.site.logoUrl !== null) ? this.model.site.logoUrl : 'https://webkit.atombits.xyz/agenthos/app/agenthos_wallet_icon.png';
        return 'url('+logoUrl+')';
    }

    getStatusClass(isCompleted: boolean): string {
        return (isCompleted) ? 'agt-badge-success-gradient' : 'agt-badge-danger-gradient';
    }

    getStatusIcon(isCompleted: boolean): string {
        return (isCompleted) ? 'fe-check-circle' : 'fe-x-circle';
    }

    getStatusLabel(isCompleted: boolean): string {
        return (isCompleted) ? 'Completado' : 'Incompleto';
    }

}
