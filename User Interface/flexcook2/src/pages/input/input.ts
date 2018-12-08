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
  
  text: string;
  itemname: string;
  name = new FormControl('');
  newid: string;
  id: string;
  ingList = [];
  newId = "no";

  uoms = [
    'pieces',
    'Cups',
    'Pints',
    'Quarts',
    'Gallons',
    'Ounces',
    'Tablespoons',
    'Teaspoons',
    'Liters',
    'Milliliters',
    'Cubic Inches',
    'Cubic Centimeters',
    'Grams',
    'Milligrams',
    'Pounds',
    'Gills'
    ];
  
  model = new Ingred(4242, '', this.uoms[0], 0);


  constructor(public dataSrv: DataServiceProvider, public alertCtrl: AlertController, public navParams: NavParams, public http: HttpClient) {
    console.log('Hello Input Page');
    
    this.newId = navParams.get('newId');

    if(this.newId == "yes") {
      console.log("newId is yes.")
      console.log("launching getNewId")
      this.getNewId()
      this.prompt()
    } else {
      console.log("Into the else part now.")
    }
  
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
    console.log("uh.. " + this.id);
    this.newRec["_id"] = this.id;
    this.newRec["name"] = this.itemname;
    this.newRec["units_of_measure"].push(this.model.uom);
    let conversionFactor = this.dataSrv.getUoM()[0][this.model.uom];
    this.newRec["ingredients"][this.model.name] = (this.model.quantity / conversionFactor);
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
      this.id = res[res["length"]-1]["_id"];
      console.log(this.id);
      this.dataSrv.dataChangeSubject.next(true);
    });
  }

  
  getIngList() {

    console.log("launching getIngList.")
  
    this.http.get(this.baseURL +"/api/recipes/" + this.id, {}).subscribe(res=> {
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
    console.log("launching putInfo.")
    this.http.put(this.baseURL +"/api/recipes/" + this.id, newRec).subscribe(res=> {
    });
    this.dataSrv.dataChangeSubject.next(true);
  }

  // postInfo() {
    
  // }


//   baseURL="http://192.168.0.131:8081";

//   getNewId() {
//     this.http.post(this.baseURL +"/api/recipes/", {}).subscribe(res=> {
//       this.newid = res[res["length"]-1]["_id"];
//       console.log(this.newid);
//       // this.dataChangeSubject.next(true);
//       return String(this.newid);
      
//     });

//     this.navCtrl.push(RecipeEditorComponent, {
//       itemid: String(this.newid)
//       }
//     )
// }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InputPage');
  }

  part: string = "Ingredients";

  
    // this.navCtrl.push(InputPage, {
    //   itemnew: true
  

}
