import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the RecipePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-recipe',
  templateUrl: 'recipe.html',
})
export class RecipePage {

  recipe = [];
  ingredientList = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.recipe = navParams.get('item');
    console.log(this.recipe);

    this.ingredientList = Object.keys(this.recipe.ingredients);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecipePage');
  }

}
