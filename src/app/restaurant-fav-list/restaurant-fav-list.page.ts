import {Component, OnInit} from '@angular/core';
import {Restaurant} from '../model/restaurant.model';
import {RestaurantService} from '../restaurant/restaurant.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-restaurant-fav-list',
  templateUrl: './restaurant-fav-list.page.html',
  styleUrls: ['./restaurant-fav-list.page.scss'],
})
export class RestaurantFavListPage implements OnInit {

  restaurants: Restaurant[] = [];
  private changedFavorite = false;


  constructor(private restaurantService: RestaurantService,
              private router: Router) {
  }

  ngOnInit() {
    this.listAllRestaurants();
  }

  listAllRestaurants() {
    this.restaurantService.findAllFavorites().subscribe(restaurants => {
      console.log(restaurants);
      this.restaurants = restaurants;
    });
  }

  findByFavoritesNameOrTags(event) {
    if (!event.target.value) {
      this.listAllRestaurants();
      return;
    }
    this.restaurantService.findByFavoritesNameOrTags(event.target.value).subscribe(restaurants => {
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
    });
  }

}
