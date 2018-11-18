import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TestPage } from '../test/test';

@Component({
  selector: 'page-landing',
  templateUrl: 'landing.html'
})
export class LandingPage {
  selectedItem: any;
  icons: string[];
  recipes: Array<{title: string, note: string, icon: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');

    // Let's populate this page with some filler content for funzies
    this.icons = ['flask', 'restaurant', 'beer', 'pizza' ];

    this.recipes = [];
    // for (let recipe of this.recipes) {
      for (let i = 1; i < 16; i++) {
      this.recipes.push({
        title: 'Recipe ' + i,
        note: 'This is recipe #' + i,
        icon: this.icons[i-1]
      });
    } 
  }

  itemTapped(event, recipe) {
    this.navCtrl.push(TestPage, {
      item: recipe
      
    })
    
    console.log(recipe.title);
  }

}
