import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RecipePage } from '../../pages/recipe/recipe';
import { DataServiceProvider } from '../../providers/data-service/data-service';


@Component({
  selector: 'page-landing',
  templateUrl: 'landing.html'
})
export class LandingPage {
  selectedItem: any;
  icons: string[];
  // recipes: Array<{title: string}>;
  recipes: any[];
  // recipes = ["one"];

  constructor(public dataSrv: DataServiceProvider, public navCtrl: NavController, public navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');

    // Let's populate this page with some filler content for funzies
    this.icons = ['flask', 'restaurant', 'beer', 'pizza' ];


    this.recipes = this.dataSrv.getList();
    // for (let recipe of this.recipes) {
      // for (let i of this.dataSrv.getList()) {
      // this.recipes.push()
    


    // // for (let recipe of this.recipes) {
    //   for (let i in this.dataSrv.getList()) {
    //   this.recipes.push(i);
    // } 


  }

  itemTapped(event, recipe) {
    this.navCtrl.push(RecipePage, {
      item: recipe
      
    })
    
    console.log(recipe.title);
  }

}
