import { Component } from '@angular/core';

import { NavController, ModalController, NavParams, ViewController, Platform } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import firebase from 'firebase';
import { DataProvider } from '../../providers/data/data';

import {RestaurantPage} from '../restaurant/restaurant';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  posts: any = [];
  filteredRestaurants: any;
  searchTerm: string = '';


  public restaurantList: Array<any>;
  public loadedRestaurantList: Array<any>;
  public restaurantRef: firebase.database.Reference;




  constructor(public navCtrl: NavController,
              public afDb: AngularFireDatabase, 
              public modalCtrl: ModalController, 
              public dataProv: DataProvider) {
    // this.afDb.list('/basic_info').valueChanges().subscribe(
    //   data => {
    //       this.posts = data;
    //       console.log(data);
    //   },
    //   err => {
    //       console.log("Error! :(");
    //   }
    // )
    this.restaurantRef = firebase.database().ref('/basic_info');

    this.restaurantRef.on('value', restaurantList =>{
      let restaurants = [];
      restaurantList.forEach( restaurant => {
        restaurants.push(restaurant.val());
        return false;
      });

      this.restaurantList = restaurants;
      this.loadedRestaurantList = restaurants;
      console.log(this.restaurantList);
    })
  }

  initializeItems(): void {
    this.restaurantList = this.loadedRestaurantList;
  }

  getItems(searchbar) {
    this.initializeItems();

    var q = searchbar.srcElement.value;
  
    if (!q) {
      return;
    }
  
    this.restaurantList = this.restaurantList.filter((v) => {
      if(v.name && q) {
        if (v.name.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });
  
    console.log(q, this.restaurantList.length);
  
  }


  // ionViewDidLoad() {
  //   this.setFilteredItems();
  // }

  // setFilteredItems() {
  //     this.filteredRestaurants = this.filterRestaurants(this.searchTerm);
  // }

  // filterRestaurants(searchTerm){
 
  //   return this.posts.filter((item) => {
  //       return item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
  //   });    

  // }

  openRestaurant(link_menu) {
    var menu;

    console.log('/restaurants/'.concat(link_menu));
    // this.afDb.list('/restaurants/'.concat(this.posts[restaurantNum].link_menu)).valueChanges().subscribe(
    this.afDb.object('/restaurants/'.concat(link_menu)).snapshotChanges().map(action => {
      const $key = action.payload.key;
      const data = {$key, ...action.payload.val()};
      return data;
    }).subscribe(
      item => {
        console.log(item);
        menu = {restaurantJSON: item};
        console.log(menu)
        // let modal = this.modalCtrl.create(RestaurantPage, menu);
        // modal.present();
        this.navCtrl.push(RestaurantPage, menu);
      },
      err => {
        console.log('Error! :(');
      }
    );
  }

}
