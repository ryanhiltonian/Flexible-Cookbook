import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { RecipePage } from '../../pages/recipe/recipe';
import { InputPage } from '../../pages/input/input';
import { DataServiceProvider } from '../../providers/data-service/data-service';
import { DialogServiceProvider } from '../../providers/dialog-service/dialog-service';
import { RecipeEditorComponent } from '../../components/recipe-editor/recipe-editor';


@Component({
  selector: 'page-landing',
  templateUrl: 'landing.html'
})
export class LandingPage {
  
  title = "My Recipes";

  // icons: string[];
  recipes= [];
  errorMessage:string;

  constructor(public alertCtrl: AlertController, public dataSrv: DataServiceProvider, public navCtrl: NavController, public navParams: NavParams) {
    // this.loadRecipes();
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
  
  
  // prompt() {
  //   let itemname = this.dataSrv.prompt();

  // }

  addNew() {
    // let itemname = this.dataSrv.prompt();
    // console.log("Got back itemname: " + itemname)
    this.navCtrl.push(InputPage, {
      willbenew: "yes"
    })
    
    console.log("Add new recipe button clicked.");
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
  //           this.addNew(item.name);
            
  //         }
  //       }
  //     ]
  //   });
  //   prompt.present();
  // }
  


}
