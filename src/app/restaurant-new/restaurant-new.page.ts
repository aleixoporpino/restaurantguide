import {Component} from '@angular/core';
import {Restaurant} from '../model/restaurant.model';
import {Router} from '@angular/router';
import {RestaurantService} from '../restaurant/restaurant.service';
import {NavController} from '@ionic/angular';
import {NativeGeocoder, NativeGeocoderForwardResult, NativeGeocoderOptions} from '@ionic-native/native-geocoder/ngx';
import {GoogleMapOptions, GoogleMaps, Marker} from '@ionic-native/google-maps';

@Component({
    selector: 'app-restaurant-new',
    templateUrl: './restaurant-new.page.html',
    styleUrls: ['./restaurant-new.page.scss'],
})
export class RestaurantNewPage {

    restaurant: Restaurant = new Restaurant();

    constructor(private restaurantService: RestaurantService,
                private router: Router,
                private navCtrl: NavController,
                private nativeGeocoder: NativeGeocoder) {

    }

    addRestaurant() {
        // TODO: Transfer this logic to a service.
        const options: NativeGeocoderOptions = {
            useLocale: true,
            maxResults: 1
        };
        this.nativeGeocoder.forwardGeocode(this.restaurant.address, options)
            .then((coordinates: NativeGeocoderForwardResult[]) => {
                console.log('---------------------------------------------------------------' +
                    '------------------------------------------------------------------------' +
                    '--------------------------------------------------------------------');
                console.log('The coordinates are latitude=' + coordinates[0].latitude +
                    ' and longitude=' + coordinates[0].longitude);
                this.restaurant.latitude = Number(coordinates[0].latitude);
                this.restaurant.longitude = Number(coordinates[0].longitude);
                this.restaurant.favorite = false;
                this.restaurant.stars = 0;
                this.restaurantService.save(this.restaurant).subscribe(res => {
                    if (res.errorCode !== 0) {
                        alert('An unexpected error ocurred, please contact the system`s administrator');
                    } else {
                        this.router.navigate(['/']);
                    }
                });
            })
            .catch((error: any) => console.log(error));
    }

    back() {
        this.navCtrl.back();
    }
}
