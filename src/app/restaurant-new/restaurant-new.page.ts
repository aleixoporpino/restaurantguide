import {Component} from '@angular/core';
import {Restaurant} from '../model/restaurant.model';
import {Router} from '@angular/router';
import {RestaurantService} from '../restaurant/restaurant.service';
import {NavController} from '@ionic/angular';

@Component({
    selector: 'app-restaurant-new',
    templateUrl: './restaurant-new.page.html',
    styleUrls: ['./restaurant-new.page.scss'],
})
export class RestaurantNewPage {

    restaurant: Restaurant = new Restaurant();

    constructor(private restaurantService: RestaurantService, private router: Router, private navCtrl: NavController) {

    }

    addRestaurant() {
        this.restaurant.favorite = false;
        this.restaurant.stars = 0;
        this.restaurantService.save(this.restaurant).subscribe(res => {
            if (res.errorCode !== 0) {
                alert('An unexpected error ocurred, please contact the system`s administrator');
            } else {
                this.router.navigate(['/']);
            }
        });
    }

    back() {
        this.navCtrl.back();
    }
}
