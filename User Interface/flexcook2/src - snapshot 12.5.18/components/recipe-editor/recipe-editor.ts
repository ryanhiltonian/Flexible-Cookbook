import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Ingred }    from '../editor';
import { InputPage } from '../../pages/input/input';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { DataServiceProvider } from '../../providers/data-service/data-service';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

/**
 * Generated class for the RecipeEditorComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'recipe-editor',
  templateUrl: 'recipe-editor.html'
})
export class RecipeEditorComponent {

  text: string;
  itemname: string;
  name = new FormControl('');
  newid: string;
  ingList = [];
  willbenew = "no";
  
  
  constructor( public alertCtrl: AlertController, public navParams: NavParams, public dataSrv: DataServiceProvider, public http: HttpClient, public navCtrl: NavController) {
    console.log('Hello RecipeEditorComponent Component');
    
    this.willbenew = navParams.get('willbenew');
    console.log(this.willbenew)
    // this.itemnew = false;
    // this.itemnew = navParams.get('itemnew');
    // if (this.itemnew) {
    //   this.getNewId();
    // } else {
      // this.newid = navParams.get('itemid');
    // };
    if(this.willbenew == "yes") {
      this.prompt()
    };
    
    if (this.newid == undefined) {
      this.getNewId()
    };

    this.getIngList();

    
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


  uoms = [
    'Cups',
    'Pints',
    'Quarts',
    'Gallons',
    'Ounces',
    'Tablespoons',
    'Teaspoons',
    'Large Eggs',
    'Liters',
    'Milliliters',
    'Cubic Inches',
    'Cubic Centimeters',
    'Grams',
    'Milligrams',
    'Pounds',
    'Gills'
    ];

    
  // ingList = ["Batter", "Sugar", "Third thing that is really really long and pretty much never ends. For my Testing purposes."];
  // qtyList = ["4", "1", 8];
  // UoMs = ["Cups", "Tablespoons", "Teaspoons"];
  // newvarplz = [];

  qtyList = [];
  UoMs = [];
  // thatt = [];

  bringList() {
    return this.ingList
  }


  
  model = new Ingred(4242, '', this.uoms[0], 0);

  submitted = false;
  
  newRec = 
    {
      "images": [],
      "units_of_measure": [],
      "_id": '',
      "name": '',
      "instructions": '',
      "ingredients": JSON
  }

  onSubmit() { 
    this.submitted = true;
    this.ingList.push(this.model.name);
    this.qtyList.push(this.model.quantity);
    this.UoMs.push(this.model.uom);
    console.log(this.newRec);
    console.log("uh.. " + this.newid);
    this.newRec["_id"] = this.newid;
    this.newRec["name"] = this.itemname;
    this.newRec["units_of_measure"].push(this.model.uom);
    // this.newRec["ingredients"].push(this.model.name);
    this.newRec["ingredients"][this.model.name] = this.model.quantity;
    console.log(this.newRec);

    this.putInfo(this.newRec);

      // for( let item of this.ingList) {
      //   let num = this.ingList[item];
      //   this.newRec["ingredients"][item] = this.newRec["ingredients"][num];
      // }
  }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }

  newIngred() {
    this.model = new Ingred(4242, '', '', 0);
  }

  baseURL="http://192.168.0.131:8081";

  getNewId() {
    this.http.post(this.baseURL +"/api/recipes/", {}).subscribe(res=> {
      this.newid = res[res["length"]-1]["_id"];
      console.log(this.newid);
      this.dataSrv.dataChangeSubject.next(true);
      // return this.newid;
    });
  }

  
  getIngList() {
  
    this.http.get(this.baseURL +"/api/recipes/" + this.newid, {}).subscribe(res=> {
      // this.newid = res[res["length"]-1]["_id"];
      let ingList = [];
      this.dataSrv.dataChangeSubject.next(true);

      for(let item in res["ingredients"]) {
        ingList.push(item[0])
      }

      // let blabla = res["ingredients"]
      // let pshaw = Array.arguments(blabla)
      console.log(ingList);
      return ingList;
    });
  }


  putInfo(newRec) {
    this.http.put(this.baseURL +"/api/recipes/" + this.newid, newRec).subscribe(res=> {
    });
    this.dataSrv.dataChangeSubject.next(true);
  }



  skyDog(): Ingred {
    let myIngred =  new Ingred(42, 'SkyDog',
                           'Fetch any object at any distance',
                           7);
    console.log('My Ingred is called ' + myIngred.name); // "My hero is called SkyDog'
    return myIngred;
  }

  //////// NOT SHOWN IN DOCS ////////

  // Reveal in html:
  //   Name via form.controls = {{showFormControls(heroForm)}}
  // showFormControls(form: any) {
  //   return form && form.controls['name'] &&
  //   form.controls['name'].value; // Dr. IQ
  // }

}
