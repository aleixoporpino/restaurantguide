import {Component, OnInit} from '@angular/core';
import {RestaurantService} from '../restaurant/restaurant.service';
import {Restaurant} from '../model/restaurant.model';
import {Router} from '@angular/router';
import {SocialSharing} from '@ionic-native/social-sharing/ngx';

@Component({
    selector: 'app-restaurant-list',
    templateUrl: './restaurant-list.page.html',
    styleUrls: ['./restaurant-list.page.scss'],
})
export class RestaurantListPage implements OnInit {

    // search: string;
    restaurants: Restaurant[] = [];
    private changedFavorite = false;


    constructor(private restaurantService: RestaurantService,
                private router: Router,
                private socialSharing: SocialSharing) {
    }

    ngOnInit() {
    }

    ionViewDidEnter() {
        this.listAllRestaurants();
    }

    listAllRestaurants() {
        this.restaurantService.findAll().subscribe(restaurants => {
            console.log(restaurants);
            this.restaurants = restaurants;
        });
    }

    findByNameOrTag(event) {
        if (!event.target.value) {
            this.listAllRestaurants();
            return;
        }
        this.restaurantService.findByNameOrTags(event.target.value).subscribe(restaurants => {
            this.restaurants = restaurants;
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
            }
            this.listAllRestaurants();
        });
    }
}
