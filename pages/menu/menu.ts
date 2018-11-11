import { Component } from '@angular/core';
import { NavController, ModalController, NavParams, ViewController, Platform, List } from 'ionic-angular';
import 'rxjs/add/operator/map';

import { Slides } from 'ionic-angular';
import {ItemPage} from '../item/item';

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html'
})
export class MenuPage{

    posts: any;
    sectionsList: string[] = [];
    menuKeys: any;
    itemKeys: any;
    sec: any;
    allPhotos: any[][];
    restaurantKey:any;

    constructor(public platform: Platform,
                public params: NavParams,
                public navCtrl: NavController,
                public viewCtrl: ViewController,
                public modalCtrl: ModalController){

        this.posts = this.params.get('menuJSON');
        this.restaurantKey = this.params.get('restaurantKey');
        console.log(this.posts);

        this.menuKeys = Object.keys(this.posts);
        
        this.menuKeys.map(key =>{
            console.log(key);
            this.sec = this.posts[key];
            console.log(this.sec);
            this.sectionsList.push(this.sec.section);
            console.log(this.sec.section);
            this.allPhotos = [];
            if(this.sec.items != null){
                this.itemKeys = Object.keys(this.sec.items);
                this.sec.itemsNum = this.itemKeys.length;
                console.log(this.itemKeys); 
                var i = 0;
                this.itemKeys.map(iKey =>{
                    this.sec.items[iKey].photoKeys = [];
                    if(this.sec.items[iKey].photos != null){
                        this.allPhotos[i] = [];
                        console.log(this.sec.items[iKey].photos);
                        this.sec.items[iKey].photoKeys = Object.keys(this.sec.items[iKey].photos);
                        this.sec.items[iKey].photoKeys.forEach(photoKey => {
                            console.log(this.sec.items[iKey].photos[photoKey]);
                            this.allPhotos[i].push(this.sec.items[iKey].photos[photoKey].image);
                        });
                        i++;
                    }
                })
            }
            console.log(this.allPhotos);
            this.sec.photos = [];
            for(var k = 0; k < 6; k++){
                for(var j = i-1; j >= 0; j--){
                    if(this.allPhotos[j][k] != null) this.sec.photos.push(this.allPhotos[j][k]);
                }
            }

            console.log(this.posts);
            console.log(this.sec.photos);
        })
        console.log(this.sectionsList);
    }

    openSection(sectionKey) {
        console.log(sectionKey);
        var data = {sectionJSON: this.params.get('menuJSON'), sectionKey: sectionKey, restaurantKey: this.restaurantKey };
        console.log("qui")
        console.log(data)
        this.navCtrl.push(ItemPage,data);
    }

    dismiss(){
        this.navCtrl.pop();
    }
}

