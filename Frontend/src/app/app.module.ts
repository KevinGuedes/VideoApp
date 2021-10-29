import { AppComponent } from './app.component';
import { HomeComponent } from './components/pages/home/home.component';
import { VimeComponent } from './components/pages/vime/vime.component';
import { NavComponent } from './components/templates/nav/nav.component';
import { VideogularComponent } from './components/pages/videogular/videogular.component';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { VimeModule } from '@vime/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { VgCoreModule } from '@videogular/ngx-videogular/core';
import { VgControlsModule } from '@videogular/ngx-videogular/controls';
import { VgOverlayPlayModule } from '@videogular/ngx-videogular/overlay-play';
import { VgBufferingModule } from '@videogular/ngx-videogular/buffering';
import { HttpClientModule } from '@angular/common/http';
import { VimeVpComponent } from './components/pages/vime/vime-vp/vime-vp.component';
import { VideogularVpComponent } from './components/pages/videogular/videogular-vp/videogular-vp.component';
import { VideoTagComponent } from './components/pages/video-tag/video-tag.component';
import { VideoTagVpComponent } from './components/pages/video-tag/video-tag-vp/video-tag-vp.component'

@NgModule({
  declarations: [
    AppComponent,
    VimeComponent,
    NavComponent,
    HomeComponent,
    VideogularComponent,
    VimeVpComponent,
    VideogularVpComponent,
    VideoTagComponent,
    VideoTagVpComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatCardModule,
    MatIconModule,
    MatDividerModule,
    VimeModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
