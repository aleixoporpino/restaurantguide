import {Component, OnInit} from '@angular/core';
import {Restaurant} from '../model/restaurant.model';
import {RestaurantService} from '../restaurant/restaurant.service';
import {Router} from '@angular/router';
import {GoogleMap, GoogleMapOptions, GoogleMaps, Marker} from '@ionic-native/google-maps';
import {forEach} from '@angular-devkit/schematics';

@Component({
    selector: 'app-restaurant-fav-list',
    templateUrl: './restaurant-fav-list.page.html',
    styleUrls: ['./restaurant-fav-list.page.scss'],
})
export class RestaurantFavListPage implements OnInit {
    map: GoogleMap;
    restaurants: Restaurant[] = [];
    torontoLat = 43.761539;
    torontoLng = -79.411079;
    markers = [];
    private changedFavorite = false;


    constructor(private restaurantService: RestaurantService,
                private router: Router) {
    }

    ngOnInit() {
    }

    ionViewWillEnter() {
        this.listAllRestaurants();
    }

    ionViewDidEnter() {
        this.loadMap();
    }

    listAllRestaurants() {
        this.restaurantService.findAllFavorites().subscribe(restaurants => {
            console.log(restaurants);
            this.restaurants = restaurants;
            this.refreshMarkers();
        });
    }

    loadMap() {
        const mapOptions: GoogleMapOptions = {
            camera: {
                target: {
                    lat: this.torontoLat,
                    lng: this.torontoLng
                },
                zoom: 9,
                tilt: 0
            }
        };
        if (this.restaurants) {
            this.map = GoogleMaps.create('map_canvas', mapOptions);
        }
    }

    refreshMarkers() {
        if (this.restaurants) {
            if (this.map != null && this.map != undefined) {
                console.log('entered to clear............');
                this.map.clear().then(
                    value => alert('cleared map')
                ).catch(reason => alert(reason.toString()));
            }
            for (const restaurant of this.restaurants) {
                const marker: Marker = this.map.addMarkerSync({
                    title: restaurant.name,
                    icon: 'red',
                    animation: 'DROP',
                    position: {
                        lat: restaurant.latitude,
                        lng: restaurant.longitude
                    }
                });
                this.markers.push(marker);
                marker.showInfoWindow();
                console.log('MAAAAAAAAAAAAAAAAAAP', marker.getMap());
            }
        }
    }

    findByFavoritesNameOrTags(event) {
        if (!event.target.value) {
            this.listAllRestaurants();
            return;
        }
        this.restaurantService.findByFavoritesNameOrTags(event.target.value).subscribe(restaurants => {
            this.restaurants = restaurants;
            this.refreshMarkers();
        });
    }

    clickDetails(id: number) {
        if (this.changedFavorite) {
            this.changedFavorite = false;
        } else {
            this.router.navigate(['/restaurant-details/' + id]);
        }
    }

    clickFavorite(res: Restaurant) {
        res.favorite = !res.favorite;
        this.changedFavorite = true;

        this.restaurantService.update(res).subscribe(value => {
            if (value.errorCode !== 0) {
                alert('Something unexpected happened, please contact the system`s administrator');
            } else {
                this.listAllRestaurants();
            }
        });
    }

}
