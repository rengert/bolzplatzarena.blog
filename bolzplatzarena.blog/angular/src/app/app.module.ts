import { NgOptimizedImage, registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import localeDe from '@angular/common/locales/de';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BlockComponent } from './components/blocks/block/block.component';
import { CodeBlockComponent } from './components/blocks/code-block/code-block.component';
import { HtmlBlockComponent } from './components/blocks/html-block/html-block.component';
import { PerformanceBlockComponent } from './components/blocks/performance-block/performance-block.component';
import { SearchComponent } from './components/blocks/search/search.component';
import { SoundBlockComponent } from './components/blocks/sound-block/sound-block.component';
import { ButtonComponent } from './components/button/button.component';
import { CmsComponent } from './components/cms/cms.component';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { ArchiveComponent } from './components/pages/archive/archive.component';
import { TeaserComponent } from './components/pages/archive/teaser/teaser.component';
import { SectionHeaderComponent } from './components/section-header/section-header.component';
import { SuggestionComponent } from './components/suggestion/suggestion.component';
import { TagCloudComponent } from './components/tag-cloud/tag-cloud.component';
import { TagsComponent } from './components/tags/tags.component';

registerLocaleData(localeDe);

@NgModule({
  declarations: [
    AppComponent,
    ArchiveComponent,
    BlockComponent,
    ButtonComponent,
    CmsComponent,
    CodeBlockComponent,
    FeedbackComponent,
    FooterComponent,
    HeaderComponent,
    HtmlBlockComponent,
    NavigationComponent,
    PerformanceBlockComponent,
    SoundBlockComponent,
    SuggestionComponent,
    TagCloudComponent,
    TagsComponent,
    TeaserComponent,
    SearchComponent,
    SectionHeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      registrationStrategy: 'registerWhenStable:30000',
    }),
    FormsModule,
    NgOptimizedImage,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'de' }],
  bootstrap: [AppComponent],
})
export class AppModule {
}
