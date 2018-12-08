import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LandingPage } from '../landing/landing';
import { RecipePage } from '../../pages/recipe/recipe';

@Component({
  selector: 'page-test',
  templateUrl: 'test.html'
})
export class TestPage {

  recipe = [];

  constructor(public navParams: NavParams) {
    this.recipe = navParams.get('item')
  }
  
  consolePlease(recipe) {
    console.log(recipe)
  }
 
  buttonTapped(recipe) {
    this.navCtrl.push(RecipePage, {
      item: recipe
      
    })
  };
}
