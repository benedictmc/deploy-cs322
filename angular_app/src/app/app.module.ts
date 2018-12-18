import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GoogleModule } from './google.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { NavComponent } from './nav/nav.component';
import { SplashComponent } from './splash/splash.component';
import { AboutComponent } from './about/about.component';
import { ParallaxModule, ParallaxConfig } from 'ngx-parallax';
import {NgxAutoScrollModule} from "ngx-auto-scroll";
import { SamplesComponent } from './samples/samples.component';

const appRoutes: Routes = [
  { path: '', component: SplashComponent },
  { path: 'generate', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'samples', component: SamplesComponent }
  ];


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    SplashComponent,
    AboutComponent,
    SamplesComponent
  ],
  imports: [
    BrowserModule,
    GoogleModule,
    NgxAutoScrollModule,
    AppRoutingModule,
    RouterModule.forRoot(
      appRoutes
    ),
    HttpClientModule,
    BrowserAnimationsModule,
    ParallaxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
