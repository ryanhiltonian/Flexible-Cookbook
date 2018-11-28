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
            "Units_of_Measure": [
            "Cups",
            "Gallons",
            "Ounces"
        ],
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
            "Units_of_Measure": [
            "Cups",
            "Gallons",
            "Ounces"
        ],
          "__v": 0
      },
      {
          "images": [],
          "_id": "5bf9e5bbfb9a6339ec4ea87f",
          "name": "Recipe13",
          "instructions": "",
          "__v": 0,
          "ingredients": {'':[]},
          "Units of Meausre": []
      },
      {
          "images": [],
          "_id": "5bf9e692f985511c5c2a8bb9",
          "name": "Recipe14",
          "instructions": "Mix flours14 and water together in a bowl Do you really need to sift flour? Can you eyeball the water for a pot of rice? We debunk 14 common recipe instructions that aren't really necessary. Save your time and energy for something more important-like dessert!Do you really need to sift flour? Can you eyeball the water for a pot of rice? We debunk 14 common recipe instructions that aren't really necessary. Save your time and energy for something more important-like dessert!",
          "ingredients": {
            "Ingredient1": ".15",
            "Ingredient2": ".105",
            "ingredient3": "14",
            "Ingredient4": ".15",
            "Ingredient5": ".105",
            "ingredient6": "14",
            "Ingredient7": ".15",
            "Ingredient8": ".105",
            "ingredient9": "14",
            "Ingredient10": ".15",
            "Ingredient11": ".105",
            "ingredient12": "14",
            "Ingredient13": ".15",
            "Ingredient14": ".105",
            "ingredient15": "14"
        },
             "Units_of_Measure": [
            "Cups",
            "Gallons",
            "Ounces",
            "Pints",
            "Cups",
            "Gallons",
            "Ounces",
            "Pints",
            "Cups",
            "Gallons",
            "Ounces",
            "Pints","Cups",
            "Gallons",
            "Ounces"
        ],
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
            "ingredient3": "14",
            "Ingredient4": ".15",
            "Ingredient5": ".105",
            "ingredient6": "14",
            "Ingredient7": ".15",
            "Ingredient8": ".105",
            "ingredient9": "14",
            "Ingredient10": ".15",
            "Ingredient11": ".105",
            "ingredient12": "14",
            "Ingredient13": ".15",
            "Ingredient14": ".105",
            "ingredient15": "14"
        },
            "Units_of_Measure": [
                "Cups",
                "Gallons",
                "Ounces",
                "Pints",
                "Cups",
                "Gallons",
                "Ounces",
                "Pints",
                "Cups",
                "Gallons",
                "Ounces",
                "Pints","Cups",
                "Gallons",
                "Ounces"
            ],
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
                "Units_of_Measure": [
                "Cups",
                "Gallons"
            ],
          "__v": 0
      },
      {
        "images": [],
        "_id": "5bf9ea2226bce823bc545486",
        "name": "Recipe19",
        "instructions": "Mix flours14 and water together in a bowl Do you really need to sift flour? Can you eyeball the water for a pot of rice? We debunk 14 common recipe instructions that aren't really necessary. Save your time and energy for something more important-like dessert!Do you really need to sift flour? Can you eyeball the water for a pot of rice? We debunk 14 common recipe instructions that aren't really necessary. Save your time and energy for something more important-like dessert!Mix flours14 and water together in a bowl Do you really need to sift flour? Can you eyeball the water for a pot of rice? We debunk 14 common recipe instructions that aren't really necessary. Save your time and energy for something more important-like dessert!Do you really need to sift flour? Can you eyeball the water for a pot of rice? We debunk 14 common recipe instructions that aren't really necessary. Save your time and energy for something more important-like dessert!Mix flours16 and water together in a bowl Bring 3 cups water and 1/2 teaspoon salt to a boil.       Add 1 cup cereal and turn heat to low. Cover and cook for about 10 minutes, stirring occasionall      Makes enough for four hungry folks (about 2-1/2 cups). Serve with honey (or brown sugar) and milk. ",
        "ingredients": {
            "Ingredient1": ".15",
            "Ingredient2": ".105",
            "ingredien3": "14"
        },
        "Units_of_Measure": [
        "Cups",
        "Gallons"
    ],
        "__v": 0
      }
  ]
    

}

getUoM() {

//Like the previous method, above, this one will be updated when I figure out how to 
//actually get the objects from the database.  For now, I will use this example 
//document, which is the Unit of Measure conversion table.


    return [
        {
            "Cups": 6.66667,
            "Pints": 3.333,
            "Gallons": 0.4166875,
            "Ounces": 53.336,
            "Tablespoons": 106.66667,
            "Teaspoons": 320,
            "Liters": 1.57725491789,
            "Milliliters": 1577.25491789,
            "Cubic Inches": 96.25

          }
    ]
}

}
