import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { YouTubePlayerModule } from "@angular/youtube-player";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './movies/login/login.component';
import { ListMoviesComponent } from './movies/list-movies/list-movies.component';
import { MaterialModule } from './movies/material/material.module';
import { DetailsMoviesComponent } from './movies/details-movies/details-movies.component';
import { ReactiveFormsModule } from '@angular/forms';
import { VideoComponent } from './movies/Models/video/video.component';
import { HeaderComponent } from './movies/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ListMoviesComponent,
    DetailsMoviesComponent,
    VideoComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    YouTubePlayerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
