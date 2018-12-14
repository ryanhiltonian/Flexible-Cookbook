import { Component } from '@angular/core';
import { IonicPage, NavParams, NavController } from 'ionic-angular';
import { DataServiceProvider } from '../../providers/data-service/data-service';
import { AlertController } from 'ionic-angular';
import { InputPage } from '../../pages/input/input';
import { LandingPage } from '../../pages/landing/landing';

@IonicPage()
@Component({
  selector: 'page-recipe',
  templateUrl: 'recipe.html',
})
export class RecipePage {
  ionViewWillEnter(){
    this.dataSrv.getList();
    }
  
  conversionJson = this.dataSrv.conversionJson;
  conversionNamesChangeable = this.dataSrv.conversionNames.slice(0,15);
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

  
  goHome() {
    this.navCtrl.push(LandingPage, {} );
  }

  checkUom(uom) {
    console.log(uom);
    // var good = []
    var good = this.conversionNamesChangeable;
      if (good.indexOf(uom) > -1) {
        return true
      } else {
        return false
      }
  }

  convert(item, i) {
      let alert = this.alertCtrl.create();
      alert.setTitle('Change unit of measure to:');
        for( let unit of this.conversionNamesChangeable) {
            alert.addInput({
              type: 'radio',
              label: unit,
              value: unit,
              checked: false
            });
          };

      alert.addButton('Cancel');

      if ( this.checkUom(this.uomsDisplayed[i]) ) {  //if the uom brought in is in the 'good' changeable list, display the 'OK' button
      alert.addButton({
        text: 'OK',
        handler: data => {
          this.uomsDisplayed[i] = data;
          var num1 = this.combinedList[item];
          var num2 = +this.conversionJson[data];
          this.quantitiesList[i] = (num1 * num2).toFixed(2);
        }
      });
    } else {
      alert.setTitle("You can only convert from the units of measure on this list.")
    };

      alert.present();
    }


    editRecipe(item) {
      this.navCtrl.push(InputPage, {
        recId: item._id,
        recipe: item
      })
      console.log("Add new recipe button clicked.");
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecipePage');
    this.dataSrv.getList();
  }

}
