import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import localeDe from '@angular/common/locales/de';
import { LOCALE_ID, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BlockComponent } from './components/blocks/block/block.component';
import { CodeBlockComponent } from './components/blocks/code-block/code-block.component';
import { HtmlBlockComponent } from './components/blocks/html-block/html-block.component';
import { PerformanceBlockComponent } from './components/blocks/performance-block/performance-block.component';
import { ButtonComponent } from './components/button/button.component';
import { CmsComponent } from './components/cms/cms.component';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { ArchiveComponent } from './components/pages/archive/archive.component';
import { TeaserComponent } from './components/pages/archive/teaser/teaser.component';
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
    FooterComponent,
    HeaderComponent,
    HtmlBlockComponent,
    NavigationComponent,
    PerformanceBlockComponent,
    TeaserComponent,
    TagsComponent,
    FeedbackComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
    ReactiveFormsModule,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'de' }],
  bootstrap: [AppComponent],
})
export class AppModule {
}
