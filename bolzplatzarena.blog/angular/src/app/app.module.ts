import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CmsComponent } from "./components/cms-component/cms.component";
import { HttpClientModule } from "@angular/common/http";
import { BlockComponent } from './components/blocks/block/block.component';
import { HtmlBlockComponent } from './components/blocks/html-block/html-block.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    CmsComponent,
    BlockComponent,
    HtmlBlockComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
