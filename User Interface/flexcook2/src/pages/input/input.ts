import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { DataServiceProvider } from '../../providers/data-service/data-service';
import { HttpClient } from '@angular/common/http';
import { LandingPage } from '../../pages/landing/landing';

import { FormControl } from '@angular/forms';
import { Ingred, Instruction, Todo }    from '../input/editor';
import {Observable} from 'rxjs/Observable';


@IonicPage()
@Component({
  selector: 'page-input',
  templateUrl: 'input.html',
})


export class InputPage {
  
  baseURL= this.dataSrv.baseURL;
  submitted = false;

  recipe: Object;
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

  model = new Ingred(null, null, null);
  instructions = new Instruction('testing');
  todo = new Todo("firstthing", 'secondthing');

  constructor(public dataSrv: DataServiceProvider, public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, public http: HttpClient) {
    
    
    this.newIngred();
    this.recId = navParams.get('recId');

    if(this.recId == "newplease") {
      this.getNewId();
      this.prompt();

    } else {

      this.recipe = navParams.get('recipe');
      this.id = this.recId;
      this.itemname = this.recipe["name"];
      this.instructions.text = this.recipe["instructions"];

      [this.ingredientsList, this.quantitiesList, this.combinedList, this.uomsDisplayed] = 
      this.dataSrv.parseData(this.recipe);

    }
  
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

  
  newIngred() {
    this.model = new Ingred(null, null, null);
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
    this.resetRec();
    this.ingredientsList.push(this.model.name);
    this.quantitiesList.push(this.model.quantity);
    this.uomsDisplayed.push(this.model.uom);
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
    this.newIngred();
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
  

  getNewId() {
    this.http.post(this.baseURL +"/api/recipes/", {}).subscribe(res=> {
      this.id = res[res["length"]-1]["_id"];
      this.dataSrv.dataChangeSubject.next(true);
    });
  }


  saveInstructions() { 
    this.newRec["_id"] = this.id;
    this.newRec["name"] = this.itemname;
    this.newRec["units_of_measure"] = this.uomsDisplayed;
    this.newRec["ingredients"] = this.combinedList;
    this.newRec["instructions"] = document.getElementById('textOfInstructions').innerText;
    this.dataSrv.putInfo(this.newRec);
    this.instructions.text = this.newRec["instructions"];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InputPage');
  }

  part: string = "Ingredients";

}
