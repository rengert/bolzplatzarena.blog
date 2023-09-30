import { NgOptimizedImage } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { enableProdMode, importProvidersFrom, LOCALE_ID } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AppRoutingModule } from './app/app-routing.module';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      BrowserModule,
      AppRoutingModule,
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
