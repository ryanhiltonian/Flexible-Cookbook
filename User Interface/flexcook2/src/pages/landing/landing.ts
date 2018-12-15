import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { RecipePage } from '../../pages/recipe/recipe';
import { InputPage } from '../../pages/input/input';
import { DataServiceProvider } from '../../providers/data-service/data-service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'page-landing',
  templateUrl: 'landing.html'
})
export class LandingPage {
  ionViewWillEnter(){
  this.loadRecipes();
  }
  
  baseURL = this.dataSrv.baseURL;
  
  title = "My Recipes";
  recipes= [];
  errorMessage:string;

  constructor(public http: HttpClient, public alertCtrl: AlertController, public dataSrv: DataServiceProvider, public navCtrl: NavController, public navParams: NavParams) {
  
    dataSrv.dataChanged$.subscribe((dataChanged: boolean) => {
    this.loadRecipes();
    });
  }

  loadRecipes() {
    this.dataSrv.getList()
    .subscribe(
      recipes => this.recipes = recipes,
      error => this.errorMessage = <any>error);
  }

  itemTapped(event, recipe) {
    this.navCtrl.push(RecipePage, {
      item: recipe
    })
  }

  addNew() {
    this.navCtrl.push(InputPage, {
      recId: "newplease"
    })
    console.log("Add new recipe button clicked.");
  }

  editRecipe(item) {
    this.navCtrl.push(InputPage, {
      recId: item._id,
      recipe: item
    })
    console.log("Edit recipe launched.");
  }

  removeRecipe(item, i) {
    this.dataSrv.removeRecipe(item, i);
    this.navCtrl.push(LandingPage, {
    });
  }
    
}
