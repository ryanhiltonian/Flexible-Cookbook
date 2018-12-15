import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import{map, catchError} from 'rxjs/operators';
import{ Subject} from 'rxjs';
import { Nav, NavParams, AlertController } from 'ionic-angular';
import { InputPage } from '../../pages/input/input';
import { LandingPage } from '../../pages/landing/landing';


@Injectable()
export class DataServiceProvider {

  items: any = [];

  dataChanged$: Observable<boolean>;
  dataChangeSubject: Subject <boolean>;
  baseURL="http://166.70.225.69:8081";

  conversionJson = this.getUoM()[0];
  conversionNames = Object.keys(this.conversionJson);
  conversionFactors = [];

  constructor (public http: HttpClient, public alertCtrl: AlertController){
    console.log('Hello DataServiceProvider Provider');

    this.dataChangeSubject=new Subject <boolean>();
    this.dataChanged$=this.dataChangeSubject.asObservable();

    for( let item of this.conversionNames) {
      let num = this.conversionJson[item];
      this.conversionFactors.push(num);
    }

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
    return Observable.throw(errMsg);
  }

  putInfo(newRec) {
    console.log("launching putInfo.")
    this.http.put(this.baseURL +"/api/recipes/" + newRec._id, newRec).subscribe(res=> {
    });
    this.dataChangeSubject.next(true);
  }

  removeRecipe(item, i) {
    // this.recipes.splice(i, 1);
    this.http.delete(this.baseURL +"/api/recipes/" + item._id).subscribe(res=> {
    });
    this.dataChangeSubject.next(true);
        
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
            "Liters": 0.0591471,
            "Milliliters": 59.1471,
            "Cubic Inches": 3.60938,
            "Cubic Centimeters": 59.1471,
            "Grams": 56.699,
            "Milligrams": 56699,
            "Pounds": 0.125,
            "Gills": 0.50,  //index 14
            "pieces": 1,
            "whole": 1,
            "large": 1,
            "items": 1,
            "of them": 1,
            "to taste": 1,
            "noodles": 1,
            "eggs": 1,
            "packages": 1,
            "jars": 1,
            "boxes": 1,
            "bags": 1
          }
    ]
}

getConstants() {
  return [this.conversionJson, this.conversionNames, this.conversionFactors];
}


parseData(recipe) {
  let quantitiesList = [];  //quantities list starts with unitless numbers, but gets altered before display
  let combinedList = recipe.ingredients;  //combined list has unitless numbers
  let ingredientsList = []
  // let ingredientsList = Object.keys(recipe.ingredients);   
      // ^^ I couldn't use this line because there may be no ingredients currently listed, and it didn't like trying to covert null to an Object.
  for (let item in combinedList) {
    ingredientsList.push(item);
  }
  let uomsDisplayed = recipe.units_of_measure;

  for( let item of ingredientsList) { 
    let num = combinedList[item];
    quantitiesList.push(num);
  }

    //Start with the quantities list as it shows in the JSON,
  //But before displaying it, alter each value according to the conversion
  //factor needed, and save each back into the quantitiesList.

  for (var _i = 0; _i < quantitiesList.length; _i++) {
    var num1 = +quantitiesList[_i];
    var num2 = +this.conversionJson[uomsDisplayed[_i]]; 
    quantitiesList[_i] = (num1 * num2).toFixed(2);
  }

  return [ingredientsList, quantitiesList, combinedList, uomsDisplayed];

}

}
