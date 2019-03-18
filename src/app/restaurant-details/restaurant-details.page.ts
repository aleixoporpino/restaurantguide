import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SocialSharing} from '@ionic-native/social-sharing/ngx';
import {AlertController, NavController} from '@ionic/angular';
import {GoogleMap, GoogleMapOptions, GoogleMaps, Marker} from '@ionic-native/google-maps';


import {RestaurantService} from '../restaurant/restaurant.service';
import {Restaurant} from '../model/restaurant.model';
import {File} from '@ionic-native/file/ngx';

@Component({
    selector: 'app-restaurant-details',
    templateUrl: './restaurant-details.page.html',
    styleUrls: ['./restaurant-details.page.scss'],
})
export class RestaurantDetailsPage implements OnInit {
    map: GoogleMap;
    restaurant: Restaurant = new Restaurant();

    constructor(private restaurantService: RestaurantService,
                private activatedRoute: ActivatedRoute,
                private router: Router,
                private socialSharing: SocialSharing,
                private navCtrl: NavController,
                private alertController: AlertController,
                private file: File) {
    }


    ngOnInit() {
        this.restaurantService.findById(this.activatedRoute.snapshot.paramMap.get('id'))
            .subscribe(res => this.restaurant = res);

    }

    ionViewDidEnter() {
        this.loadMap();
    }

    loadMap() {

        // This code is necessary for browser
        // Environment.setEnv({
        //    'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyDmAZZJfPS88fSw34ZrFcKMOp1cOUb2tcI',
        //    'API_KEY_FOR_BROWSER_DEBUG': 'AIzaSyDmAZZJfPS88fSw34ZrFcKMOp1cOUb2tcI'
        // });
        const mapOptions: GoogleMapOptions = {
            camera: {
                target: {
                    lat: this.restaurant.latitude,
                    lng: this.restaurant.longitude
                },
                zoom: 15,
                tilt: 30
            }
        };

        this.map = GoogleMaps.create('map_canvas', mapOptions);

        const marker: Marker = this.map.addMarkerSync({
            title: this.restaurant.name,
            snippet: this.restaurant.address,
            icon: 'red',
            animation: 'DROP',
            position: {
                lat: this.restaurant.latitude,
                lng: this.restaurant.longitude
            }
        });

        marker.showInfoWindow();
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

    async shareOnFacebook() {
        const file = await this.resolveLocalFile();
        this.socialSharing.shareViaFacebook('See this restaurant ' + this.restaurant.name
            , file.nativeURL, this.restaurant.address).then(() => {
            console.log('shared via facebook');
            this.removeTempFile(file.name);
        });
    }

    async shareOnEmail() {
        const file = await this.resolveLocalFile();
        this.socialSharing.shareViaEmail('See this restaurant ' + this.restaurant.name,
            'Restaurant Guide - ' + this.restaurant.name, null, null, null, file.nativeURL).then(() => {
            console.log('shared via e-mail');
            this.removeTempFile(file.name);
        });
    }

    shareOnTwitter() {
        this.socialSharing.shareViaTwitter('See this restaurant ' + this.restaurant.name,
            `${this.file.applicationDirectory}www/assets/icon/favicon.png`).then(() => {
            console.log('shared via twitter');
        });
    }

    async shareOnWhatsapp() {
        const file = await this.resolveLocalFile();
        this.socialSharing.shareViaWhatsApp('See this restaurant ' + this.restaurant.name, file.nativeURL, null).then(() => {
            console.log('shared via whatsapp');
            this.removeTempFile(file.name);
        });
    }

    async resolveLocalFile() {
        return this.file.copyFile(`${this.file.applicationDirectory}www/assets/icon/`,
            'favicon.png', this.file.cacheDirectory, `${new Date().getTime()}.png`);
    }

    removeTempFile(name) {
        this.file.removeFile(this.file.cacheDirectory, name);
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
