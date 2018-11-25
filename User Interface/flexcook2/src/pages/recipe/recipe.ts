import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataServiceProvider } from '../../providers/data-service/data-service';

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
  ingredientsList = [];
  quantitiesList = [];
  combinedList = [];
  conversionJson = [];
  conversionNames = [];
  conversionFactors = [];

  constructor(public navCtrl: NavController, public dataSrv: DataServiceProvider, public navParams: NavParams) {
    this.recipe = navParams.get('item');
    console.log(this.recipe);

    this.ingredientsList = Object.keys(navParams.get('item').ingredients);
    this.combinedList = navParams.get('item').ingredients;
    console.log(this.combinedList);
    console.log(this.ingredientsList);

    for( let item of this.ingredientsList) {
      let num = this.combinedList[item];
      this.quantitiesList.push(num);
      // console.log(this.quantitiesList);
    }
   
    this.conversionJson = this.dataSrv.getUoM();
    console.log(this.conversionJson);
    this.conversionNames = Object.keys(this.conversionJson[0]);
    console.log(this.conversionNames);

    for( let item of this.conversionNames) {
      let num = this.conversionJson[0][item];
      this.conversionFactors.push(num);
      // console.log(this.conversionFactors);
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecipePage');
  }

}
