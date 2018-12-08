import { Component } from '@angular/core';
import { IonicPage, NavParams, NavController } from 'ionic-angular';
import { DataServiceProvider } from '../../providers/data-service/data-service';
import { AlertController } from 'ionic-angular';

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
  UoMsDisplayed = []; //This lists the units of measure for each ingredient, in the order seen on the screen.

  constructor(public alertCtrl: AlertController, public dataSrv: DataServiceProvider, public navParams: NavParams) {
    this.recipe = navParams.get('item');
    console.log(this.recipe);
    console.log("Place 1");

    this.combinedList = navParams.get('item').ingredients;
    console.log("Place 2");
    this.ingredientsList = Object.keys(navParams.get('item').ingredients);
    console.log("Place 3");
    console.log(this.combinedList);
    console.log(this.ingredientsList);
    console.log("Place 4");

    for( let item of this.ingredientsList) {
      let num = this.combinedList[item];
      this.quantitiesList.push(num);
      console.log("Place 5");
      
      console.log(this.quantitiesList);
    }
   
    //Start with the quantities list as it shows in the JSON,
    //But before displaying it, alter each value according to the conversion
    //factor needed.
    console.log("Place 6");

    this.conversionJson = this.dataSrv.getUoM();
    console.log(this.conversionJson);
    this.conversionNames = Object.keys(this.conversionJson[0]);
    console.log(this.conversionNames);

    for( let item of this.conversionNames) {
      let num = this.conversionJson[0][item];
      this.conversionFactors.push(num);
      console.log(this.conversionFactors);
    }
    console.log("Place 7");

    this.UoMsDisplayed = navParams.get('item').units_of_measure;
    console.log("Place 8");
    console.log(navParams.get('item'));
    console.log("Place 9");
    console.log(this.UoMsDisplayed);


    for (var _i = 0; _i < this.quantitiesList.length; _i++) {
      var num1 = +this.quantitiesList[_i];
      var num2 = +this.conversionJson[0][this.UoMsDisplayed[_i]];
      this.quantitiesList[_i] = (num1 * num2).toFixed(2);
    }

  }

  convert(item, i) {
    
      let alert = this.alertCtrl.create();
      alert.setTitle('Change unit of measure to:');
  
      for( let unit of this.conversionNames) {
      alert.addInput({
        type: 'radio',
        label: unit,
        value: unit,
        checked: false
      });
    }
  
      alert.addButton('Cancel');
      alert.addButton({
        text: 'OK',
        handler: data => {
          this.UoMsDisplayed[i] = data;
          var num1 = this.combinedList[item];
          var num2 = +this.conversionJson[0][data];
          this.quantitiesList[i] = (num1 * num2).toFixed(2);
        }
      });
      alert.present();
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecipePage');
  }

}
