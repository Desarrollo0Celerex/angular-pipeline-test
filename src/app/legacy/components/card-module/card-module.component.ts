import { Component, Input } from '@angular/core';

@Component({
  selector: 'agt-card-module',
  templateUrl: './card-module.component.html',
  styles: [
  ]
})
export class CardModuleComponent {
    @Input() title: string = '';
    @Input() subtitle: string = '';
    @Input() icon: string = '';
    @Input() subdescription: string = '';
    @Input() description: string = '';
    @Input() route: string = '';
    @Input() isCompleted: boolean | null = null;
    @Input() labelStatusCompleted: string = 'Completado';
    @Input() labelStatusIncomplete: string = 'Configurar';

    get buttonClass(): string {
        return (this.isCompleted) ? 'agt-btn-success-light' : 'agt-btn-warning-light'
    }

    get buttonIcon(): string {
        return (this.isCompleted) ? 'fe-check-circle' : 'fe-settings'
    }

    get buttonLabel(): string {
        return (this.isCompleted) ? this.labelStatusCompleted : this.labelStatusIncomplete;
    }
}
