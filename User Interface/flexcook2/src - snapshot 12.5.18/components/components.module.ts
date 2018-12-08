import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { MyApp }  from '../app/app.component';
import { RecipeEditorComponent } from './recipe-editor/recipe-editor';


@NgModule({
	declarations: [
		MyApp,
		RecipeEditorComponent
	],
	imports: [
	
    BrowserModule,
    FormsModule
	],
  bootstrap: [
	  MyApp
	],
	exports: [RecipeEditorComponent]
})
export class ComponentsModule {}
