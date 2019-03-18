import {Component, OnInit} from '@angular/core';
import {Restaurant} from '../model/restaurant.model';
import {ActivatedRoute, Router} from '@angular/router';
import {RestaurantService} from '../restaurant/restaurant.service';
import {NavController} from '@ionic/angular';
import {NativeGeocoder, NativeGeocoderForwardResult, NativeGeocoderOptions} from '@ionic-native/native-geocoder/ngx';

@Component({
    selector: 'app-restaurant-edit',
    templateUrl: './restaurant-edit.page.html',
    styleUrls: ['./restaurant-edit.page.scss'],
})
export class RestaurantEditPage implements OnInit {

    restaurant: Restaurant = new Restaurant();

    constructor(private restaurantService: RestaurantService,
                private activatedRoute: ActivatedRoute,
                private navCtrl: NavController,
                private nativeGeocoder: NativeGeocoder) {
    }

    ngOnInit() {
        this.restaurantService.findById(this.activatedRoute.snapshot.paramMap.get('id'))
            .subscribe(res => this.restaurant = res);
    }

    back() {
        this.navCtrl.back();
    }

    updateRestaurant() {
        const options: NativeGeocoderOptions = {
            useLocale: true,
            maxResults: 1
        };
        this.nativeGeocoder.forwardGeocode(this.restaurant.address, options)
            .then((coordinates: NativeGeocoderForwardResult[]) => {
                this.restaurant.latitude = Number(coordinates[0].latitude);
                this.restaurant.longitude = Number(coordinates[0].longitude);
                this.restaurantService.update(this.restaurant).subscribe(res => {
                    if (res.errorCode !== 0) {
                        alert('An unexpected error occurred, please contact the system`s administrator');
                    } else {
                        this.navCtrl.back();
                    }
                });
            })
            .catch((error: any) => console.log(error));
    }
}
