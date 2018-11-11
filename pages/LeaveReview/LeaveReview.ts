import { Component } from '@angular/core';
import { NavController, ModalController, NavParams, ViewController, Platform, List } from 'ionic-angular';
import 'rxjs/add/operator/map';

import { Slides } from 'ionic-angular';
import {ItemPage} from '../item/item';
import { AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import { AlertController } from 'ionic-angular';
import firebase from 'firebase';

@Component({
    templateUrl: 'LeaveReview.html'
  })
  
  export class LeaveReviewPage {
    restaurantKey: void;
    sectionKey : any;
    itemKey:any;
    item:any;
    alertCtrl: AlertController;
    captureDataUrl:any;

    constructor(public navCtrl: ModalController, 
                public viewCtrl: ViewController,
                public params: NavParams,
                       alertCtrl: AlertController) {

            this.restaurantKey = this.params.get('restaurantKey');
            this.sectionKey = this.params.get('sectionKey');
            this.itemKey = this.params.get('itemKey');
            this.item = this.params.get('item');
            this.captureDataUrl = this.params.get('captureDataUrl');

            this.alertCtrl = alertCtrl;
    }

    upload() {
      let storageRef = firebase.storage().ref();
      const filename = Math.floor(Date.now() / 1000);
      // Create a reference to 'images/todays-date.jpg'
      const imageRef = storageRef.child(`images/${filename}.jpg`);
      imageRef.putString(this.captureDataUrl, firebase.storage.StringFormat.DATA_URL).then((snapshot)=> {
        this.showSuccesfulUploadAlert();
      });
  
    }
  
    showSuccesfulUploadAlert() {
      let alert = this.alertCtrl.create({
        title: 'Thank you!',
        subTitle: 'Your review will be published soon',
        //buttons: ['OK']
        buttons: [{
          text: 'OK',
          handler: () => {
            alert.dismiss();
            this.close();
            return false;
          }
        }]
      });
      alert.present();
  
      // clear the previous photo data in the variable
      //this.captureDataUrl = "";
    }

    close(){
      this.captureDataUrl = "";
      this.viewCtrl.dismiss();
    }
  

  }