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
  
  conversionJson = this.dataSrv.conversionJson;
  conversionNames = this.dataSrv.conversionNames;
  conversionFactors = this.dataSrv.conversionFactors;
  recipe = [];
  ingredientsList = [];
  quantitiesList = [];  //on this page the quantitiesList shows actual numbers, not unitless amounts
  combinedList = [];  //on this page the combinedList still always shows unitless numbers
  uomsDisplayed = []; //This lists the units of measure for each ingredient, in the order seen on the screen.

  constructor(public alertCtrl: AlertController, public dataSrv: DataServiceProvider, public navParams: NavParams, public navCtrl: NavController) {

    this.recipe = navParams.get('item');
    [this.ingredientsList, this.quantitiesList, this.combinedList, this.uomsDisplayed] = 
    this.dataSrv.parseData(this.recipe);
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
          this.uomsDisplayed[i] = data;
          var num1 = this.combinedList[item];
          var num2 = +this.conversionJson[data];
          this.quantitiesList[i] = (num1 * num2).toFixed(2);
        }
      });
      alert.present();
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecipePage');
  }

}
