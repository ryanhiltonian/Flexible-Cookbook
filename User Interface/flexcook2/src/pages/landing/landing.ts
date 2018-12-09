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
  
  baseURL="http://192.168.0.131:8081";
  
  title = "My Recipes";

  // icons: string[];
  recipes= [];
  errorMessage:string;

  constructor(public http: HttpClient, public alertCtrl: AlertController, public dataSrv: DataServiceProvider, public navCtrl: NavController, public navParams: NavParams) {
  
    dataSrv.dataChanged$.subscribe((dataChanged: boolean) => {
    this.loadRecipes();
    });
    // this.icons = ['flask', 'restaurant', 'beer', 'pizza' ];
    // this.recipes = this.dataSrv.getList(); 

  }
  
  ionViewDidLoad() {
    this.loadRecipes();
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
    
    console.log(recipe.title);
  }

  addNew() {
    this.navCtrl.push(InputPage, {
      recId: "newplease"
    })
    console.log("Add new recipe button clicked.");
  }

  editRecipe(item, i) {
    this.navCtrl.push(InputPage, {
      recId: item._id,
      recipe: item
    })
    console.log("Add new recipe button clicked.");
  }

  removeRecipe(item, i) {
    // this.recipes.splice(i, 1);
    this.http.delete(this.baseURL +"/api/recipes/" + item._id).subscribe(res=> {
    });
    this.dataSrv.dataChangeSubject.next(true);
    
    this.navCtrl.push(LandingPage, {
    });
    
  }
    
}
