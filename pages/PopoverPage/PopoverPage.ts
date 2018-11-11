import { Component } from '@angular/core';
import { NavController, ModalController, NavParams, ViewController, Platform, List } from 'ionic-angular';
import 'rxjs/add/operator/map';

import { Slides } from 'ionic-angular';
import {ItemPage} from '../item/item';
import { AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import { PopoverController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

@Component({
    templateUrl: 'PopoverPage.html'
  })
  
  export class PopoverPage {

    sectionKey: any;
    restaurantKey: any;
    section: any;

    constructor(
        public viewCtrl: ViewController,
        private alertCtrl: AlertController,
        public params: NavParams,
        public afDb: AngularFireDatabase) {
        this.sectionKey = this.params.get("sectionKey");
        this.restaurantKey = this.params.get("restaurantKey");
        this.section = this.params.get("section");
    }
  
    close() {
      this.viewCtrl.dismiss();
    }

    
    additem(){
      let alert = this.alertCtrl.create({
        title: 'New Item',
        inputs: [
          {
            name: 'title',
            placeholder: 'title'
          },
          {
            name: 'description',
            placeholder: 'description and ingredients',
            type: 'textarea'
          },
          {
            name: 'price',
            placeholder: 'price',
            type : 'textarea'
          }

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
            text: 'Add',
            handler: data => {
              var rand = Math.floor(Math.random()*16777215).toString(18);
              var ss = '/restaurants/' + this.restaurantKey +'/menu_with_photo/' + this.sectionKey + '/items/-M' + rand  ;
              data.price = '$' + data.price;
              console.log(this.afDb.object(ss));
              console.log(data);
              this.afDb.object(ss).set(data);
            }
          }
        ]
      });
      alert.present();
    }
    deleteSection(){
        var ss = '/restaurants/'+this.restaurantKey+'/menu_with_photo/' + this.sectionKey;
        this.afDb.object(ss).remove();
        console.log(ss);
        console.log(this);
    }

    addsection(){
      let alert = this.alertCtrl.create({
        title: 'New Section',
        inputs: [
          {
            name: 'section',
            placeholder: 'name'
          }
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
            text: 'Add',
            handler: data => {
              var rand = Math.floor(Math.random()*16777215).toString(18);
              var ss = '/restaurants/' + this.restaurantKey +'/menu_with_photo/-M' + rand  ;
              console.log(data);
              console.log(this.afDb.object(ss));
              
              this.afDb.object(ss).set(data);
            }
          }
        ]
      });
      alert.present();
    }

    editsection(){
      console.log(this.section);
      let alert = this.alertCtrl.create({
        title: 'New Section',
        inputs: [
          {
            name: 'section',
            value: this.section.section
          }
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
              var ss = '/restaurants/' + this.restaurantKey +'/menu_with_photo/' + this.sectionKey ; // + rand  ;
              data.items = this.section.items
              console.log(data);
              console.log(this.afDb.object(ss));
              
              this.afDb.object(ss).set(data);
            }
          }
        ]
      });
      alert.present();
    }

  }