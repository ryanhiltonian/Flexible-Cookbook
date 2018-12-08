import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataServiceProvider } from '../../providers/data-service/data-service';
import { AlertController } from 'ionic-angular';
import { RecipeEditorComponent } from '../../components/recipe-editor/recipe-editor';
import { HttpClient } from '@angular/common/http';


@IonicPage()
@Component({
  selector: 'page-input',
  templateUrl: 'input.html',
})


export class InputPage {
  
// ingList = ["Batter", "Sugar", "Third thing that is really really long and pretty much never ends. For my Testing purposes."];
// qtyList = ["4", "1", 8];
// UoMs = ["Cups", "Tablespoons", "Teaspoons"];

// ingList = [];
// qtyList = [];
// UoMs = [];
// thatt = [];

  // isnew: "no";
  
  // newid; 


  constructor(public navParams: NavParams, public http: HttpClient) {
    
    // this.isnew = navParams.get('willbenew');
    // if (this.itemnew) {
      // this.newid = this.getNewId();
    // } else {
      // this.newid = navParams.get('itemid');
    // };
 
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
