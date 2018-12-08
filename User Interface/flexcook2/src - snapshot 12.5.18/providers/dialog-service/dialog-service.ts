import { Injectable } from '@angular/core';
import { AlertController, NavController, NavParams } from 'ionic-angular';
// import { GroceriesServiceProvider } from '../groceries-service/groceries-service';

/*
  Generated class for the InputDialogServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DialogServiceProvider {

  constructor(public alertCtrl: AlertController ) {
    console.log('Hello InputDialogServiceProvider Provider');
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
            return item.name;
            
          }
        }
      ]
    });
    prompt.present();
  }




}
