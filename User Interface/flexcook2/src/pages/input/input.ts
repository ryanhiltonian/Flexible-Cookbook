import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { DataServiceProvider } from '../../providers/data-service/data-service';
import { HttpClient } from '@angular/common/http';
import { LandingPage } from '../../pages/landing/landing';

import { FormControl } from '@angular/forms';
import { Ingred, Instruction, Todo }    from '../input/editor';
import {Observable} from 'rxjs/Observable';
import { RecipePage } from '../recipe/recipe';


@IonicPage()
@Component({
  selector: 'page-input',
  templateUrl: 'input.html',
})


export class InputPage {
  
  baseURL= this.dataSrv.baseURL;
  submitted = false;

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

  recipe = 
    {
      "images": [],
      "units_of_measure": [],
      "_id": '',
      "name": '',
      "instructions": '',
      "ingredients": {}
  }

  model = new Ingred(null, null, null);
  instructions = new Instruction('');
  // todo = new Todo("firstthing", 'secondthing');

  constructor(public dataSrv: DataServiceProvider, public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, public http: HttpClient) {
    
    
    this.newIngred();
    this.recId = navParams.get('recId');

    if(this.recId == "newplease") {
      this.getNewId();
      this.prompt();
      this.http.put(this.baseURL +"/api/recipes/" + this.id, {"name": this.itemname}).subscribe(res => {});

    } else {

      this.recipe = navParams.get('recipe');
      this.id = this.recId;
      this.itemname = this.recipe["name"];
      this.instructions.text = this.recipe["instructions"];

      [this.ingredientsList, this.quantitiesList, this.combinedList, this.uomsDisplayed] = 
      this.dataSrv.parseData(this.recipe);

    }
  
  }

  newIngred() {
    this.model = new Ingred(null, null, null);
  }

  getNewId() {
    this.http.post(this.baseURL +"/api/recipes/", {}).subscribe(res=> {
      this.id = res[res["length"]-1]["_id"];
      this.dataSrv.dataChangeSubject.next(true);
    });
  }

  prompt(){
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
            this.http.delete(this.baseURL +"/api/recipes/" + this.id).subscribe(res=> {});
            this.navCtrl.push(LandingPage, {});
          }
        },
        {
          text: 'Save',
          handler: item => {
            this.itemname = item.name;
          }
        }
      ]
    });
    prompt.present();
  }

  goHome() {
    this.navCtrl.push(LandingPage, {} );
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
    // this.submitted = true;
    // this.resetRec();
    
    let factor = this.conversionJson[this.model.uom];
    this.combinedList[this.model.name] = (this.model.quantity / factor);

    this.ingredientsList = Object.keys(this.combinedList);
    console.log(this.quantitiesList);
    this.quantitiesList[this.ingredientsList.indexOf(this.model.name)] = this.model.quantity;
    console.log(this.quantitiesList);
    console.log(this.model.uom);
    
    console.log(this.uomsDisplayed);
    this.uomsDisplayed[this.ingredientsList.indexOf(this.model.name)] = this.model.uom;
    console.log(this.uomsDisplayed);
    this.newRec["_id"] = this.id;
    this.newRec["name"] = this.itemname;
    this.newRec["instructions"] = this.instructions.text;
    this.newRec["units_of_measure"] = this.uomsDisplayed;
    console.log(this.newRec);
    this.newRec["ingredients"] = this.combinedList;

    this.dataSrv.putInfo(this.newRec);
    this.newIngred();
  }

  
  doneEditing() {
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
    this.newRec["instructions"] = this.instructions.text;
    this.newRec["units_of_measure"] = this.uomsDisplayed;
    for (let index in this.ingredientsList) {
      let factor = this.conversionJson[this.uomsDisplayed[index]];
      this.newRec["ingredients"][this.ingredientsList[index]] = (this.quantitiesList[index] / factor);
      }
    this.combinedList = this.newRec.ingredients;
    this.dataSrv.putInfo(this.newRec);
  }
  




  saveInstructions() { 
    this.newRec["_id"] = this.id;
    this.newRec["name"] = this.itemname;
    this.newRec["units_of_measure"] = this.uomsDisplayed;
    this.newRec["ingredients"] = this.combinedList;
    console.log(this.newRec["instructions"]);
    
    console.log((document.getElementById('textOfInstructions').innerText));
    
    this.newRec["instructions"] = document.getElementById('textOfInstructions').innerText;
    console.log(this.newRec["instructions"]);
    this.dataSrv.putInfo(this.newRec);
    this.instructions.text = this.newRec["instructions"];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InputPage');
  }

  part: string = "Ingredients";

}
