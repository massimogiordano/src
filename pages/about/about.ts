import { Component } from '@angular/core';
import { NavController, ModalController, NavParams, ViewController, Platform, List } from 'ionic-angular';
import 'rxjs/add/operator/map';

import { Slides } from 'ionic-angular';
import {ItemPage} from '../item/item';
import { AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import { PopoverController } from 'ionic-angular';
import {PopoverPage} from '../PopoverPage/PopoverPage';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})

export class AboutPage {
  restaurantKey: void;
  posts: any;
  sectionsList: string[] = [];
  keys: any;
  menuKeys: any;
  sec : any;

  constructor(public platform: Platform,
    public params: NavParams,
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    public afDb: AngularFireDatabase,
    public popoverCtrl: PopoverController,
    private alertCtrl: AlertController,
    public modalCtrl: ModalController){


this.posts = this.params.get('menuJSON');
this.restaurantKey =  this.params.get('restaurantKey');

this.menuKeys = Object.keys(this.posts);

this.menuKeys.map(key =>{
    console.log(key);
    this.sec = this.posts[key];
    console.log(this.sec);
    this.sectionsList.push(this.sec.section);
    console.log(this.sec.section);
    this.posts[key].keys = [];
    if('items' in this.posts[key]){
      Object.keys(this.posts[key].items).map(keyItem =>{
        console.log("aaa", keyItem);
        this.posts[key].keys.push(keyItem);
      });
    }

})


console.log('ooooooo');
}





openSection(sectionNum) {
var data = {sectionJSON: this.params.get('menuJSON')[sectionNum], sectionsList:this.sectionsList, sectionNum: sectionNum};
console.log(data)
let modal = this.modalCtrl.create(ItemPage, data);
modal.present();
}

dismiss(){
this.viewCtrl.dismiss();
}
my(section, ind){
  console.log(ind);
  console.log(section);
}

removeItem(section, item){
  console.log(item);
  console.log(section);
  var ss = '/restaurants/'+this.restaurantKey+'/menu_with_photo/' + section + '/items/' + item;
  this.afDb.object(ss).remove();
  console.log(ss);
  console.log(this);
}
editItem(section, item){
  console.log(item);
  console.log(section);
  var ss = '/restaurants/'+this.restaurantKey+'/menu_with_photo/' + section + '/items/' + item;
  var item_data = this.posts[section].items[item];
  console.log(item_data);
  let alert = this.alertCtrl.create({
    title: 'Edit',
    inputs: [
      {
        name: 'title',
        value: item_data.title
      },
      {
        name: 'description',
        value: item_data.description
      },
      {
        name: 'price',
        value: item_data.price
      },
      
    ],
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Save',
        handler: data => {
          var rand = Math.floor(Math.random()*16777215).toString(18);
          var ss = '/restaurants/' + this.restaurantKey +'/menu_with_photo/' + section + '/items/' + item  ;
          console.log(data);
          console.log(this.afDb.object(ss));
          
          this.afDb.object(ss).set(data);
        }
      }
    ]
  });
  alert.present();


}

presentPopover(myEvent,key) {
  var data = {sectionKey: key, restaurantKey: this.restaurantKey, section:this.posts[key]};
  console.log(data);
  let popover = this.popoverCtrl.create(PopoverPage, data);
  popover.present({
    ev: myEvent
  });
}

}


