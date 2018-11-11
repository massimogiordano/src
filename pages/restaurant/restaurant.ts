import { Component } from '@angular/core';
import { NavController, ModalController, NavParams, ViewController, Platform } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList} from 'angularfire2/database';

import { AboutPage }   from '../about/about';
import { ContactPage } from '../contact/contact';
import { MenuPage}     from '../menu/menu';

@Component({
  selector: 'page-restaurant',
  templateUrl: 'restaurant.html'
})
export class RestaurantPage {

    name: any;
    menuJSON: any;
    restaurantKey: { menuJSON: any; };

    constructor(public platform: Platform,
                public params: NavParams,
                public viewCtrl: ViewController, 
                public modalCtrl: ModalController,
                public navCtrl: NavController) {
        
        console.log(this.params);
        this.name = this.params.get('restaurantJSON').name;
        //this.menuJSON = {menuJSON: this.params.get('restaurantJSON').menu_with_photo};
        this.menuJSON = {menuJSON: this.params.get('restaurantJSON').menu_with_photo,restaurantKey : this.params.get('restaurantJSON').$key};
        console.log(this.menuJSON);

    }

    dismiss(){
        this.viewCtrl.dismiss();
    }    

  tab1Root = MenuPage;
  tab2Root = ContactPage;
  tab3Root = AboutPage;
//   tab3Root = this.navCtrl.setRoot (MenuPage, {menuJSON: this.params.get('restaurantJSON').menu_with_photo});
}
