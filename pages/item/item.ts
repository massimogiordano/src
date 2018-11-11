import { Component, ViewChild } from '@angular/core';
import { NavController, ModalController, NavParams, ViewController, Platform, Content} from 'ionic-angular';
import 'rxjs/add/operator/map';
import { Camera, CameraOptions } from '@ionic-native/camera';
import {LeaveReviewPage} from '../LeaveReview/LeaveReview';


import { Slides } from 'ionic-angular';

@Component({
  selector: 'page-item',
  templateUrl: 'item.html'
})
export class ItemPage {

    @ViewChild('scroll') scroll:any;
    @ViewChild('sectionInUse') sectionInUse:any;

    allItems: any;
    items: any;
    section: any;
    sections: any;
    sectionKey: any;
    sectionKeys: any;
    sectionJSON: any;
    itemKeys: any;
    restaurantKey:any;

    actualScrollLeft: any;

    constructor(public platform: Platform,
                public params: NavParams,
                public viewCtrl: ViewController,
                public navCtrl: NavController,
                public modalCtrl: ModalController,
                private camera: Camera) {  

        this.restaurantKey = this.params.get('restaurantKey');
        console.log("ecco");
        console.log(this.restaurantKey);
        this.sectionKey = this.params.get("sectionKey");
        this.sectionJSON = this.params.get("sectionJSON");
            this.sectionKeys = Object.keys(this.sectionJSON);
            this.allItems = this.sectionJSON[this.sectionKey];
            this.items = this.allItems.items;
            console.log(this.items);
        if(this.items != null){ 
            this.itemKeys = Object.keys(this.items);
            this.section = this.allItems.section;
            // this.items.photoKeys = [];
            // if(this.items.photos != null){
            //     this.items.photoKeys = Object.keys(this.items.photos);
            // }
        }else{
            this.allItems = null;
            this.items = null;
            this.itemKeys = null;
            this.section = null;
        }
        console.log(this.sectionKey);
        console.log(this.allItems);
        console.log(this.items);

    }

    goToOtherSection(sectionKey) {
        var data;
        data = {sectionKey: sectionKey, sectionJSON: this.sectionJSON};
        this.navCtrl.push(ItemPage, data);
    }

    dismiss(){
        this.navCtrl.pop();
    }

    ngAfterViewInit() {
        console.log("After View Init");
        console.log("Scoll element: ", this.scroll);
        console.log("Section in use: ", this.sectionInUse);
    
            this.scroll._scrollContent.nativeElement.scrollLeft = this.sectionInUse.nativeElement.offsetLeft +
                                                                  this.sectionInUse.nativeElement.clientWidth/2 - 
                                                                  this.scroll._scrollContent.nativeElement.clientWidth/2;
    }

    captureDataUrl: string; //link to the photo
    capture(itemKey) {
        const cameraOptions: CameraOptions = {
          quality: 100,
          destinationType: this.camera.DestinationType.DATA_URL,
          encodingType: this.camera.EncodingType.JPEG,
          mediaType: this.camera.MediaType.PICTURE,
        };
    
        this.camera.getPicture(cameraOptions).then((imageData) => {
          // imageData is either a base64 encoded string or a file URI
          // If it's base64:
          this.captureDataUrl = 'data:image/jpeg;base64,' + imageData;
          this.presentPopover(Event, itemKey);
        }, (err) => {
          // Handle error
        });
      }

      presentPopover(myEvent, itemKey) {
        //we cloud delete photoKeys: and photos: from data.item
        var data = {captureDataUrl:this.captureDataUrl, restaurantKey : this.restaurantKey,sectionKey: this.sectionKey, itemKey:itemKey, item: this.sectionJSON[this.sectionKey].items[itemKey]};
        console.log("hola")
        console.log(data)
        let popover = this.modalCtrl.create(LeaveReviewPage, data );
        popover.present({
          ev: myEvent
        });
      }

}
