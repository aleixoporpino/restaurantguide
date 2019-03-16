import {Injectable} from '@angular/core';
import {Restaurant} from '../model/restaurant.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {HttpReturnMessage} from '../model/httpreturnmessage.model';
import {Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {Platform} from '@ionic/angular';

@Injectable()
export class RestaurantService {

    private _URL = 'http://10.0.2.2:8090/health/restaurants';

    constructor(protected httpClient: HttpClient, public plt: Platform) {
        this._URL = plt.is('android') ? 'http://10.0.2.2:8090/health/restaurants' :
            'http://localhost:8090/health/restaurants';
    }

    public save(restaurant: Restaurant): Observable<HttpReturnMessage> {
        return this.httpClient.post<HttpReturnMessage>(this._URL + '/', restaurant);

    }

    public delete(restaurant: Restaurant): Observable<HttpReturnMessage> {

        return this.httpClient.delete<HttpReturnMessage>(this._URL + '/' + restaurant.id, {});
    }

    public findByNameOrTags(nameOrTags: String): Observable<Array<Restaurant>> {
        const headers = new HttpHeaders({
            'Content-type': 'application/x-www-form-urlencoded; charset=utf-8'
        });
        return this.httpClient.get<Array<Restaurant>>(this._URL + '/nameortags/' + nameOrTags, {headers: headers})
            .pipe(
                retry(1),
                catchError(this.handleError)
            );
    }

    public findByFavoritesNameOrTags(nameOrTags: String): Observable<Array<Restaurant>> {
        const headers = new HttpHeaders({
            'Content-type': 'application/x-www-form-urlencoded; charset=utf-8'
        });
        return this.httpClient.get<Array<Restaurant>>(this._URL + '/favorites/' + nameOrTags, {headers: headers})
            .pipe(
                retry(1),
                catchError(this.handleError)
            );
    }

    public findAll(): Observable<Array<Restaurant>> {
        const headers = new HttpHeaders({
            'Content-type': 'application/x-www-form-urlencoded; charset=utf-8'
        });
        return this.httpClient.get<Array<Restaurant>>(this._URL, {headers: headers})
            .pipe(
                retry(1),
                catchError(this.handleError)
            );
    }

    public findAllFavorites(): Observable<Array<Restaurant>> {
        const headers = new HttpHeaders({
            'Content-type': 'application/x-www-form-urlencoded; charset=utf-8'
        });
        return this.httpClient.get<Array<Restaurant>>(this._URL +'/favorites', {headers: headers})
            .pipe(
                retry(1),
                catchError(this.handleError)
            );
    }

    handleError(error) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            errorMessage = `Error: ${error.error.message}`;
        } else {
            errorMessage = `Error code: ${error.status}\n Message: ${error.message} , ${error}`;
        }
        window.alert(errorMessage);
        return throwError(errorMessage);
    }

    public findById(id: string): Observable<Restaurant> {
        const headers = new HttpHeaders({
            'Content-type': 'application/x-www-form-urlencoded; charset=utf-8'
        });
        return this.httpClient.get<Restaurant>(this._URL + '/' + Number(id), {headers: headers});
    }

    public update(restaurant: Restaurant): Observable<HttpReturnMessage> {
        return this.httpClient.put<HttpReturnMessage>(this._URL + '/' + restaurant.id, restaurant, {});
    }
}
