import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { FormsModule } from '@angular/forms';
import { MyApp } from './app.component';
import { LandingPage } from '../pages/landing/landing';
import { RecipePage } from '../pages/recipe/recipe';
import { InputPage } from '../pages/input/input';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DataServiceProvider } from '../providers/data-service/data-service';

import { HttpModule } from '@angular/http'
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    MyApp,
    LandingPage,
    RecipePage,
    InputPage
  ],
  imports: [
    HttpModule,
    HttpClientModule,
    BrowserModule,
    FormsModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LandingPage,
    RecipePage,
    InputPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DataServiceProvider
  ]
})
export class AppModule {}
