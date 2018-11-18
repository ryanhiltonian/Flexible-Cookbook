import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LandingPage } from '../landing/landing';

@Component({
  selector: 'page-test',
  templateUrl: 'test.html'
})
export class TestPage {

  recipe = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.recipe = navParams.get('item')
  }
  
  consolePlease(recipe) {
    console.log(recipe)
  }
 
} 
