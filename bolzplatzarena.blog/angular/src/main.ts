import { NgOptimizedImage } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { enableProdMode, importProvidersFrom, LOCALE_ID } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AppComponent } from './app/app.component';
import { CmsComponent } from './app/components/cms/cms.component';
import { TagsComponent } from './app/components/tags/tags.component';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      BrowserModule,
      RouterModule.forRoot([
        { path: 'tags/:tag', component: TagsComponent },
        {
          path: 'nonogramm',
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          loadChildren: (): Promise<any> => import('./app/modules/nonogramm/nonogramm.module').then(m => m.NonogrammModule),
        },
        { path: '**', component: CmsComponent },
      ], { scrollPositionRestoration: 'top' }),
      ReactiveFormsModule,
      ServiceWorkerModule.register(
        'ngsw-worker.js',
        {
          enabled: environment.production,
          registrationStrategy: 'registerWhenStable:30000',
        },
      ),
      FormsModule,
      NgOptimizedImage,
    ),
    { provide: LOCALE_ID, useValue: 'de' },
    provideHttpClient(withInterceptorsFromDi()),
  ],
})
  .catch(err => console.error(err));
