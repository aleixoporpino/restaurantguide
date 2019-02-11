import {Injectable} from '@angular/core';
import {Restaurant} from '../model/restaurant.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {HttpReturnMessage} from '../model/httpreturnmessage.model';
import {Observable} from 'rxjs';

@Injectable()
export class RestaurantService {

    private URL = 'http://localhost:8090/health/restaurants';

    constructor(protected httpClient: HttpClient) {

    }

    public save(restaurant: Restaurant): Observable<HttpReturnMessage> {
        return this.httpClient.post<HttpReturnMessage>(this.URL + '/', restaurant);

    }

    public delete(restaurant: Restaurant): Observable<HttpReturnMessage> {

        return this.httpClient.delete<HttpReturnMessage>(this.URL + '/' + restaurant.id, {});
    }

    public findByNameOrTags(nameOrTags: String): Observable<Array<Restaurant>> {
        const headers = new HttpHeaders({
            'Content-type': 'application/x-www-form-urlencoded; charset=utf-8'
        });
        return this.httpClient.get<Array<Restaurant>>(this.URL + '/nameortags/' + nameOrTags, {headers: headers});
    }

    public findAll(): Observable<Array<Restaurant>> {
        const headers = new HttpHeaders({
            'Content-type': 'application/x-www-form-urlencoded; charset=utf-8'
        });
        return this.httpClient.get<Array<Restaurant>>(this.URL, {headers: headers});
    }

    public findById(id: string): Observable<Restaurant> {
        const headers = new HttpHeaders({
            'Content-type': 'application/x-www-form-urlencoded; charset=utf-8'
        });
        return this.httpClient.get<Restaurant>(this.URL + '/' + Number(id), {headers: headers});
    }

    public update(restaurant: Restaurant): Observable<HttpReturnMessage> {
        return this.httpClient.put<HttpReturnMessage>(this.URL + '/' + restaurant.id, restaurant, {});
    }
}
