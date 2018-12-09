import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { DataServiceProvider } from '../../providers/data-service/data-service';
import { HttpClient } from '@angular/common/http';

import { FormControl } from '@angular/forms';
import { Ingred }    from '../input/editor';
import {Observable} from 'rxjs/Observable';


@IonicPage()
@Component({
  selector: 'page-input',
  templateUrl: 'input.html',
})


export class InputPage {
  
  baseURL="http://192.168.0.131:8081";
  submitted = false;

  recipe: Object;
  text: string;
  itemname: string;
  recId: string;
  id: string;
  instructions: string;


  conversionJson = this.dataSrv.conversionJson;
  conversionNames = this.dataSrv.conversionNames;
  conversionFactors = this.dataSrv.conversionFactors;

  combinedList = {};
  ingredientsList = [];
  quantitiesList = [];
  uomsDisplayed = [];
  name = new FormControl('');
  UoMs = this.conversionNames;
  model = new Ingred(null, null, null);

  constructor(public dataSrv: DataServiceProvider, public alertCtrl: AlertController, public navParams: NavParams, public http: HttpClient) {
    
    
    console.log('Hello Input Page');
    this.newIngred();
    this.recId = navParams.get('recId');

    if(this.recId == "newplease") {
      console.log("recId is newplease.");
      console.log("launching getNewId");
      this.getNewId();
      this.prompt();

    } else {

      console.log("Into the else part now.");
      this.recipe = navParams.get('recipe');
      this.id = this.recId;
      this.itemname = this.recipe["name"];
      this.instructions = this.recipe["instructions"]
      console.log("name seen as:");
      console.log(this.itemname);

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
            console.log('Cancel clicked');
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
    this.submitted = true;
    this.resetRec();
    let factor = this.conversionJson[this.model.uom];
    this.ingredientsList.push(this.model.name);
    this.quantitiesList.push(this.model.quantity);
    this.uomsDisplayed.push(this.model.uom);
    this.newRec["_id"] = this.id;
    this.newRec["name"] = this.itemname;
    this.newRec["units_of_measure"] = this.uomsDisplayed;
    for (let index in this.ingredientsList) {
      let factor = this.conversionJson[this.uomsDisplayed[index]];
      this.newRec["ingredients"][this.ingredientsList[index]] = (this.quantitiesList[index] / factor);
      }
    this.dataSrv.putInfo(this.newRec);
  }

  deleteIngred(ingred, i) {
    
    this.resetRec();
    this.ingredientsList.splice(i, 1);
    this.quantitiesList.splice(i, 1);
    this.uomsDisplayed.splice(i, 1);
    this.newRec["_id"] = this.id;
    this.newRec["name"] = this.itemname;
    this.newRec["units_of_measure"] = this.uomsDisplayed;
    for (let index in this.ingredientsList) {
      let factor = this.conversionJson[this.uomsDisplayed[index]];
      this.newRec["ingredients"][this.ingredientsList[index]] = (this.quantitiesList[index] / factor);
      }
    this.dataSrv.putInfo(this.newRec);
  }
  

  getNewId() {
    this.http.post(this.baseURL +"/api/recipes/", {}).subscribe(res=> {
      this.id = res[res["length"]-1]["_id"];
      console.log(this.id);
      this.dataSrv.dataChangeSubject.next(true);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InputPage');
  }

  part: string = "Ingredients";

}
