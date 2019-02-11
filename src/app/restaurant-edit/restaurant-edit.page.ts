import {Component, OnInit} from '@angular/core';
import {Restaurant} from '../model/restaurant.model';
import {ActivatedRoute, Router} from '@angular/router';
import {RestaurantService} from '../restaurant/restaurant.service';
import {NavController} from '@ionic/angular';

@Component({
    selector: 'app-restaurant-edit',
    templateUrl: './restaurant-edit.page.html',
    styleUrls: ['./restaurant-edit.page.scss'],
})
export class RestaurantEditPage implements OnInit {

    restaurant: Restaurant = new Restaurant();

    constructor(private restaurantService: RestaurantService,
                private activatedRoute: ActivatedRoute,
                private navCtrl: NavController) {
    }

    ngOnInit() {
        this.restaurantService.findById(this.activatedRoute.snapshot.paramMap.get('id'))
            .subscribe(res => this.restaurant = res);
    }

    back() {
        this.navCtrl.back();
    }

    updateRestaurant() {
        this.restaurantService.update(this.restaurant).subscribe(res => {
            if (res.errorCode !== 0) {
                alert('An unexpected error ocurred, please contact the system`s administrator');
            } else {
                this.navCtrl.back();
            }
        });
    }
}
