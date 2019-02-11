import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
    // { path: 'home', loadChildren: './home/home.module#HomePageModule' },
    {path: '', loadChildren: './tabs/tabs.module#TabsModule'},
    {path: 'restaurant', loadChildren: './restaurant-new/restaurant-new.module#RestaurantNewPageModule'},
    {path: 'restaurant-new', loadChildren: './restaurant-new/restaurant-new.module#RestaurantNewPageModule'},
    {path: 'restaurant-details/:id', loadChildren: './restaurant-details/restaurant-details.module#RestaurantDetailsPageModule'},
    {path: 'restaurant-edit/:id', loadChildren: './restaurant-edit/restaurant-edit.module#RestaurantEditPageModule'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
