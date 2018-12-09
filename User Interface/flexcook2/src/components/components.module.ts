import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule }   from '@angular/forms';
import { MyApp }  from '../app/app.component';

@NgModule({
	declarations: [
		MyApp
	],
	imports: [
	
    BrowserModule,
    FormsModule
	],
  bootstrap: [
	  MyApp
	],
	exports: []
})
export class ComponentsModule {}
