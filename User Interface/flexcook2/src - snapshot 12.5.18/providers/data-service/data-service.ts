import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import{map,catchError} from 'rxjs/operators';
import{ Subject} from 'rxjs';
import { Nav, NavParams, AlertController } from 'ionic-angular';
import { InputPage } from '../../pages/input/input';
import { LandingPage } from '../../pages/landing/landing';
import { DialogServiceProvider } from '../../providers/dialog-service/dialog-service';
import { RecipeEditorComponent } from '../../components/recipe-editor/recipe-editor';


@Injectable()
export class DataServiceProvider {

  items: any = [];

  dataChanged$: Observable<boolean>;
  dataChangeSubject: Subject <boolean>;
  baseURL="http://192.168.0.131:8081";

  constructor (public http: HttpClient, public alertCtrl: AlertController, public dialogSrv: DialogServiceProvider){
    console.log('Hello DataServiceProvider Provider');

    this.dataChangeSubject=new Subject <boolean>();
    this.dataChanged$=this.dataChangeSubject.asObservable();
  }

  getList():Observable<object[]> {
    return this.http.get(this.baseURL + '/api/recipes').pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  private extractData(res:Response){
    let body=res;
    return body || {};

  }
    
  private handleError(error:Response | any){
    let errMsg: string;
    if (error instanceof Response){
      const err=error || '';
      errMsg=`${error.status} - ${error.statusText || ''} ${err}`;
    }else{
      errMsg=error.message ? error.message : error.toString();
    }
    
    // console.error(errMsg);
    return Observable.throw(errMsg);
  }

getUoM() {

//For now, I will let the conversion factors be hard-coded

    return [
        {
            
            "Cups": 0.25,
            "Pints": 0.125,
            "Quarts": 0.0625,
            "Gallons": 0.015625,
            "Ounces": 2.00,
            "Tablespoons": 4.00,
            "Teaspoons": 12.00,
            "Large Eggs": 1,
            "Liters": 0.0591471,
            "Milliliters": 59.1471,
            "Cubic Inches": 3.60938,
            "Cubic Centimeters": 59.1471,
            "Grams": 56.699,
            "Milligrams": 56699,
            "Pounds": 0.125,
            "Gills": 0.50
          }
    ]
}


// prompt(){
//   const prompt = this.alertCtrl.create({
//     title: 'Add Recipe',
//     message: "Please enter recipe name...",
//     inputs: [
//       {
//         name: 'name',
//         placeholder: 'Name'
//       }
//     ],
//     buttons: [
//       {
//         text: 'Cancel',
//         handler: data => {
//           console.log('Cancel clicked');
//         }
//       },
//       {
//         text: 'Save',
//         handler: item => {
//           return item.name;
          
//         }
//       }
//     ]
//   });
//   prompt.present();
// }



// addNew(item) {
//   this.navCtrl.push(InputPage, {
//     recipename: item.name
//   })
  
//   console.log("Add new recipe button clicked.");
// }


  // newid: string;

  // getNewId() {
  //   this.http.post(this.baseURL +"/api/recipes/", {}).subscribe(res=> {
  //     // this.newitem=res[3]["_id"];
  //     this.newid = res[res["length"]-1]["_id"];
  //     console.log(this.newid);
  //     this.dataChangeSubject.next(true);
  //     // this.recedit.nextid = this.newid;
  //     // return this.newid;
  //   });
  // }

}
