import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImageAgenthosAssistantModule } from '@components/image-agenthos-assistant/image-agenthos-assistant.module';
import { ContentSuggestionsComponent } from './content-suggestions.component';
import { PluralModule } from '@pipes/plural/plural.module';

@NgModule({
    declarations: [ContentSuggestionsComponent],
    exports: [ContentSuggestionsComponent],
    imports: [CommonModule, ImageAgenthosAssistantModule, PluralModule],
})
export class ContentSuggestionsModule {}
