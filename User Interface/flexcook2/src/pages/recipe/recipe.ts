import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataServiceProvider } from '../../providers/data-service/data-service';
import { AlertController } from 'ionic-angular';


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
  UoMsDisplayed = []; //This lists the units of measure for each ingredient, in the order seen on the screen.

  constructor(public alertCtrl: AlertController, public navCtrl: NavController, public dataSrv: DataServiceProvider, public navParams: NavParams) {
    this.recipe = navParams.get('item');
    console.log(this.recipe);

    this.combinedList = navParams.get('item').ingredients;
    this.ingredientsList = Object.keys(navParams.get('item').ingredients);
    // console.log(this.combinedList);
    // console.log(this.ingredientsList);

    for( let item of this.ingredientsList) {
      let num = this.combinedList[item];
      this.quantitiesList.push(num);
      // console.log(this.quantitiesList);
    }
   
    //Start witht the quantities list as it shows in the JSON,
    //But before displaying it, alter each value according to the conversion
    //factor needed.

    this.conversionJson = this.dataSrv.getUoM();
    // console.log(this.conversionJson);
    this.conversionNames = Object.keys(this.conversionJson[0]);
    // console.log(this.conversionNames);

    for( let item of this.conversionNames) {
      let num = this.conversionJson[0][item];
      this.conversionFactors.push(num);
      // console.log(this.conversionFactors);
    }

    this.UoMsDisplayed = navParams.get('item').Units_of_Measure;
    // console.log(this.UoMsDisplayed);


    for (var _i = 0; _i < this.quantitiesList.length; _i++) {
      var num1 = +this.quantitiesList[_i];
      var num2 = +this.conversionJson[0][this.UoMsDisplayed[_i]];
      this.quantitiesList[_i] = (num1 * num2).toFixed(2);
    }

  }

  // convert($event, item, i) {
  //   console.log("Going in: "+ this.UoMsDisplayed);
  //   console.log(this.UoMsDisplayed[i])
  //   var newthing = this.chooseNewUoM();
  //   this.UoMsDisplayed[i] = newthing;
  //   console.log("Coming out: " + this.UoMsDisplayed);
  //   console.log(this.UoMsDisplayed[i]);
  // }

  // convert() {
    //take the data listed in the above lists, and use it do alter the 
    //contents of quantitiesList.  So that the number at that index is changed.

    //and alter the contents of UoMsDisplayed to show a different unit of measure
    //at the appropriate position ( UoMsDisplayed[item] = newthing )
  // }

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
          var num2 = +this.conversionJson[0][this.UoMsDisplayed[i]];
          this.quantitiesList[i] = (num1 * num2).toFixed(2);
        }
      });
      alert.present();
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecipePage');
  }

}
