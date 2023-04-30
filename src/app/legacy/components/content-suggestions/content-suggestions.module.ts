import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImageAgenthosAssistantModule } from '@components/image-agenthos-assistant/image-agenthos-assistant.module';
import { SharedModule } from '@shared/shared.module';
import { ContentSuggestionsComponent } from './content-suggestions.component';

@NgModule({
    declarations: [ContentSuggestionsComponent],
    exports: [ContentSuggestionsComponent],
    imports: [CommonModule, ImageAgenthosAssistantModule, SharedModule],
})
export class ContentSuggestionsModule {}
