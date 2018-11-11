import { Component } from '@angular/core';
import { NavController, ModalController, NavParams, ViewController, Platform, List } from 'ionic-angular';
import 'rxjs/add/operator/map';

import { Slides } from 'ionic-angular';
import {ItemPage} from '../item/item';
import { AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import { PopoverController } from 'ionic-angular';

@Component({
    templateUrl: 'additem.html'
  })
  
  export class PopoverPage {

    sectionKey: any;
    restaurantKey: any;

    constructor(
        public viewCtrl: ViewController,
        public params: NavParams,
        public afDb: AngularFireDatabase) {
        this.sectionKey = this.params.get("sectionKey");
        this.restaurantKey = this.params.get("restaurantKey");

    }
  
    close() {
      this.viewCtrl.dismiss();
    }

    additem(){

    }
    deleteSection(){
        var ss = '/restaurants/'+this.restaurantKey+'/menu_with_photo/' + this.sectionKey;
        this.afDb.object(ss).remove();
        console.log(ss);
        console.log(this);
    }

  }