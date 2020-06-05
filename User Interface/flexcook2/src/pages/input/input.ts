import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { DataServiceProvider } from '../../providers/data-service/data-service';
import { HttpClient } from '@angular/common/http';
import { LandingPage } from '../../pages/landing/landing';
import { FormControl } from '@angular/forms';
import { Ingred, Instruction, RecipeName } from '../input/editor';
import { RecipePage} from '../recipe/recipe';

@IonicPage()
@Component({
  selector: 'page-input',
  templateUrl: 'input.html',
})

export class InputPage {

  baseURL = this.dataSrv.baseURL;
  submitted = false;

  user = this.dataSrv.user;
  text: string;
  itemname: string;
  recId: string;
  id: string;

  conversionJson = this.dataSrv.conversionJson;
  conversionNames = this.dataSrv.conversionNames;
  conversionFactors = this.dataSrv.conversionFactors;
  UoMs = this.conversionNames;

  combinedList = {};
  ingredientsList = [];
  quantitiesList = [];
  uomsDisplayed = [];
  tryingtofindout = new FormControl();

  recipe = {
    "images": [],
    "units_of_measure": [],
    "_id": '',
    "name": '',
    "instructions": '',
    "ingredients": {}
  }

  newRec =
    {
      "images": [],
      "units_of_measure": [],
      "_id": '',
      "name": '',
      "instructions": '',
      "ingredients": {}
    }

  model = new Ingred(null, null, null);
  instructionsModel = new Instruction(null);
  instructions = '';
  recipeNameModel = new RecipeName(null);

  constructor(public dataSrv: DataServiceProvider, public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, public http: HttpClient) {
    this.newIngred();
    this.recId = navParams.get('recId');

    if (this.recId == "newplease") {
      this.getNewId();
      this.prompt();
      this.instructions = this.recipe["instructions"];

    } else {

      this.recipe = navParams.get('recipe');
      this.id = this.recId;
      this.itemname = this.recipe["name"];
      this.instructions = this.recipe["instructions"];

      [this.ingredientsList, this.quantitiesList, this.combinedList, this.uomsDisplayed] =
        this.dataSrv.parseData(this.recipe);
    }

  }

  newIngred() {
    this.model = new Ingred(null, null, null);
  }

  newInstruct() {
    this.instructionsModel = new Instruction(null);
  }

  newName() {
    this.recipeNameModel = new RecipeName(null);
  }

  getNewId() {
    this.http.post(this.baseURL + "/api/recipes/", {user: this.user}).subscribe(res => {
      this.id = res[res["length"] - 1]["_id"];
      this.dataSrv.dataChangeSubject.next(true);
    });
  }

  prompt() {
    const prompt = this.alertCtrl.create({
      title: 'Add Recipe',
      message: "Please enter recipe name...",
      inputs: [
        {
          name: 'name',
          placeholder: 'Name'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            this.http.delete(this.baseURL + "/api/recipes/" + this.id).subscribe(res => { });
            this.navCtrl.push(LandingPage, {});
          }
        },
        {
          text: 'Save',
          handler: item => {
            this.itemname = item.name;
            this.recipe = {
              "images": [],
              "units_of_measure": [],
              "_id": this.id,
              "name": this.itemname,
              "instructions": '',
              "ingredients": {}
            };
          this.http.put(this.baseURL +"/api/recipes/" + this.id, this.recipe).subscribe(res=> {
          });

          }
        }
      ]
    });
    prompt.present();
  }

  promptEditName() {
    const prompt = this.alertCtrl.create({
      title: 'Edit Recipe Name',
      inputs: [
        {
          name: 'newName',
          placeholder: this.itemname
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            this.saveName();
          }
        },
        {
          text: 'Save',
          handler: item => {
            this.itemname = item.newName;
            this.saveName();
          }
        }
      ]
    });
    prompt.present();
  }

  goHome() {
    this.navCtrl.push(LandingPage, {});
  }

  resetRec() {
    this.newRec =
      {
        "images": [],
        "units_of_measure": [],
        "_id": '',
        "name": '',
        "instructions": '',
        "ingredients": {}
      }
  }

  onSubmit() {
    let factor = this.conversionJson[this.model.uom];
    this.combinedList[this.model.name] = (this.model.quantity / factor);
    this.ingredientsList = Object.keys(this.combinedList);
    this.quantitiesList[this.ingredientsList.indexOf(this.model.name)] = this.model.quantity;
    this.uomsDisplayed[this.ingredientsList.indexOf(this.model.name)] = this.model.uom;
    this.fillOutNewRecipe();
    this.newIngred();
  }

  fillOutNewRecipe() {
    this.newRec["_id"] = this.id;
    this.newRec["name"] = this.itemname;
    this.newRec["instructions"] = this.instructions;
    this.newRec["units_of_measure"] = this.uomsDisplayed;
    this.newRec["ingredients"] = this.combinedList;
    this.dataSrv.putInfo(this.newRec);
  }

  doneEditing() {
    this.fillOutNewRecipe();
    this.navCtrl.push(RecipePage, {
      item: this.newRec
    });
  }

  deleteIngred(ingred, i) {
    this.resetRec();
    this.ingredientsList.splice(i, 1);
    this.quantitiesList.splice(i, 1);
    this.uomsDisplayed.splice(i, 1);
    this.newRec["_id"] = this.id;
    this.newRec["name"] = this.itemname;
    this.newRec["instructions"] = this.instructions;
    this.newRec["units_of_measure"] = this.uomsDisplayed;
    for (let index in this.ingredientsList) {
      let factor = this.conversionJson[this.uomsDisplayed[index]];
      this.newRec["ingredients"][this.ingredientsList[index]] = (this.quantitiesList[index] / factor);
    }
    this.combinedList = this.newRec.ingredients;
    this.dataSrv.putInfo(this.newRec);
  }

  saveInstructions() {
    this.instructions = this.instructionsModel.text;
    this.fillOutNewRecipe();
    this.newInstruct();
  }

  saveName() {
    this.fillOutNewRecipe();
    this.newName();
  }

  part: string = "Ingredients";

}
