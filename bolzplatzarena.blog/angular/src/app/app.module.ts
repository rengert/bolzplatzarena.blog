import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BlockComponent } from './components/blocks/block/block.component';
import { HtmlBlockComponent } from './components/blocks/html-block/html-block.component';
import { CmsComponent } from './components/cms/cms.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { PostComponent } from './components/blocks/post/post.component';
import { ArchiveComponent } from './components/pages/archive/archive.component';
import { TeaserComponent } from './components/pages/archive/teaser/teaser.component';
import { CodeBlockComponent } from './components/blocks/code-block/code-block.component';

@NgModule({
  declarations: [
    AppComponent,
    BlockComponent,
    CmsComponent,
    FooterComponent,
    HeaderComponent,
    HtmlBlockComponent,
    NavigationComponent,
    PostComponent,
    ArchiveComponent,
    TeaserComponent,
    CodeBlockComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
