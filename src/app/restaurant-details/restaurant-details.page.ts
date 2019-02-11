import {AfterViewInit, Component, OnInit, AfterContentInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SocialSharing} from '@ionic-native/social-sharing/ngx';
import {AlertController, NavController} from '@ionic/angular';
import {
    GoogleMaps,
    GoogleMap,
    GoogleMapsEvent,
    GoogleMapOptions,
    CameraPosition,
    MarkerOptions,
    Marker,
    Environment, GoogleMapsAnimation, MyLocation
} from '@ionic-native/google-maps';


import {RestaurantService} from '../restaurant/restaurant.service';
import {Restaurant} from '../model/restaurant.model';

@Component({
    selector: 'app-restaurant-details',
    templateUrl: './restaurant-details.page.html',
    styleUrls: ['./restaurant-details.page.scss'],
})
export class RestaurantDetailsPage implements OnInit, AfterViewInit {
    mapReady = false;
    map: GoogleMap;
    restaurant: Restaurant = new Restaurant();

    constructor(private restaurantService: RestaurantService,
                private activatedRoute: ActivatedRoute,
                private router: Router,
                private socialSharing: SocialSharing,
                private navCtrl: NavController,
                private alertController: AlertController) {
    }


    ngOnInit() {
        this.restaurantService.findById(this.activatedRoute.snapshot.paramMap.get('id'))
            .subscribe(res => this.restaurant = res);

    }

    ngAfterViewInit() {
        this.loadMap();
    }

    loadMap() {

        // This code is necessary for browser
        Environment.setEnv({
            'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyDmAZZJfPS88fSw34ZrFcKMOp1cOUb2tcI',
            'API_KEY_FOR_BROWSER_DEBUG': 'AIzaSyDmAZZJfPS88fSw34ZrFcKMOp1cOUb2tcI'
        });

        const mapOptions: GoogleMapOptions = {
            camera: {
                target: {
                    lat: 43.0741904,
                    lng: -89.3809802
                },
                zoom: 18,
                tilt: 30
            }
        };

        this.map = GoogleMaps.create('map_canvas', mapOptions);

        const marker: Marker = this.map.addMarkerSync({
            title: 'Ionic',
            icon: 'blue',
            animation: 'DROP',
            position: {
                lat: 43.0741904,
                lng: -89.3809802
            }
        });
        marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
            alert('clicked');
        });
    }


    async presentAlertConfirm() {
        const alert = await this.alertController.create({
            header: 'Confirmation',
            message: 'Do you really want to delete ' + this.restaurant.name + '?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    cssClass: 'secondary',
                }, {
                    text: 'Yes',
                    cssClass: 'danger',
                    handler: () => {
                        console.log('confirma');
                        this.restaurantService.delete(this.restaurant).subscribe(res => {
                            if (res.errorCode === 0) {
                                this.router.navigate(['/']);
                            }
                        });
                    }
                }
            ]
        });

        await alert.present();
    }

    back() {
        this.navCtrl.back();
    }

    shareOnFacebook() {
        this.socialSharing.shareViaFacebook('See this restaurant', null, null).then(() => {
            console.log('shared via facebook');
        });
    }

    shareOnEmail() {
        this.socialSharing.shareViaEmail('See this restaurant', null, null).then(() => {
            console.log('shared via e-mail');
        });
    }

    shareOnTwitter() {
        this.socialSharing.shareViaTwitter('See this restaurant', null, null).then(() => {
            console.log('shared via twitter');
        });
    }

    shareOnWhatsapp() {
        this.socialSharing.shareViaWhatsApp('See this restaurant', null, null).then(() => {
            console.log('shared via whatsapp');
        });
    }

    clickStar(number: number) {
        if (this.restaurant.stars === 1 && number === 1) {
            this.restaurant.stars = 0;
        } else {
            this.restaurant.stars = number;
        }
        this.restaurantService.update(this.restaurant).subscribe(res => {
            if (res.errorCode !== 0) {
                alert('An unexpected error ocurred, please contact the system`s administrator');
            }
        });
    }
}
