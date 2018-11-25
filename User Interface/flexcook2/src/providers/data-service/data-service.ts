import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the DataServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataServiceProvider {

  baseURL="http://localhost:8080";

  constructor(public http: HttpClient) {
    console.log('Hello DataServiceProvider Provider');
  }
  
getList() {
  // return [this.http.get(this.baseURL + 'api/recipes')];
  // let recipeList = [];
  // for (let recipe in this.http.get(this.baseURL + 'api/recipes')) {
  //   recipeList.push(recipe)
  // }


  // While I troubleshoot and figure out how to get MongoDB to return a JSON object, I will
  // hard code this example JSON which represents some recipes being returned.
  return [
    
      {
          "images": [],
          "_id": "5bf9cda5617bbc327c6595cc",
          "name": "Recipe12",
          "instructions": "Mix flours14412 and water together in a bowl . . .",
          "ingredients": {
            "Ingredient1": ".15",
            "Ingredient2": ".105",
            "ingredien3": "14"
        },
          "__v": 0
      },
      {
          "images": [],
          "_id": "5bf9dddb14f9b039e80cc827",
          "name": "Recipe4",
          "instructions": "Mix flours4 and water together in a bowl . . .",
          "ingredients": {
            "Ingredient1": ".15",
            "Ingredient2": ".105",
            "ingredien3": "14"
        },
          "__v": 0
      },
      {
          "images": null,
          "_id": "5bf9e5bbfb9a6339ec4ea87f",
          "name": "Recipe13",
          "instructions": null,
          "__v": 0,
          "ingredients": null
      },
      {
          "images": [],
          "_id": "5bf9e692f985511c5c2a8bb9",
          "name": "Recipe14",
          "instructions": "Mix flours14 and water together in a bowl . . .",
          "ingredients": {
            "Ingredient1": ".15",
            "Ingredient2": ".105",
            "ingredien3": "14"
        },
          "__v": 0
      },
      {
          "images": [],
          "_id": "5bf9e98926bce823bc545485",
          "name": "Recipe16",
          "instructions": "Mix flours16 and water together in a bowl . . .",
          "ingredients": {
            "Ingredient1": ".15",
            "Ingredient2": ".105",
            "ingredien3": "14"
        },
          "__v": 0
      },
      {
          "images": [],
          "_id": "5bf9ea2226bce823bc545486",
          "name": "Recipe17",
          "instructions": "Mix flours16 and water together in a bowl . . .",
          "ingredients": {
              "Ingredient1": ".15",
              "Ingredient2": ".105",
              "ingredien3": "14"
          },
          "__v": 0
      },
      {
          "images": [],
          "_id": "5bf9eb8926bce823bc545487",
          "name": "Recipe19",
          "__v": 0
      }
  ]
    
    
    
    
    
}


}
