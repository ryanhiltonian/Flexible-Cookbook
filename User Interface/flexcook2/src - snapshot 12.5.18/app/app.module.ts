import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, NavController, NavParams } from 'ionic-angular';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { RecipeEditorComponent } from '../components/recipe-editor/recipe-editor';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list'; 
import { TestPage } from '../pages/test/test';
import { LandingPage } from '../pages/landing/landing';
import { RecipePage } from '../pages/recipe/recipe';
import { InputPage } from '../pages/input/input';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DataServiceProvider } from '../providers/data-service/data-service';

import { HttpModule } from '@angular/http'
import { HttpClientModule } from '@angular/common/http';
import { DialogServiceProvider } from '../providers/dialog-service/dialog-service';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LandingPage,
    RecipePage,
    InputPage,
    RecipeEditorComponent
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
    HomePage,
    ListPage,
    RecipePage,
    InputPage,
    RecipeEditorComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DataServiceProvider,
    DialogServiceProvider
  ]
})
export class AppModule {}
