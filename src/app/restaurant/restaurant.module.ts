import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RestaurantService} from './restaurant.service';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        HttpClientModule
    ],
    providers: [RestaurantService]
})
export class RestaurantModule {
}
