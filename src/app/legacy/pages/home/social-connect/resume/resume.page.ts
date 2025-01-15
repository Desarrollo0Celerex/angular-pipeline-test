import { Component, OnInit } from '@angular/core';

import { ROUTES_NAME } from '@constants/routes-name';

import { ResumeService } from './resume.service';

@Component({
    selector: 'agt-resume',
    templateUrl: './resume.page.html',
    styles: [],
    standalone: false
})
export class ResumePage implements OnInit {
    ROUTES_NAME: any = ROUTES_NAME;

    constructor(public model: ResumeService) { }

    ngOnInit(): void {
        this.model.loadWorkspace();
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
