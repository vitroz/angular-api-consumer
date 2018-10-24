import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ApiService {

  constructor(private _http: HttpClient) { }

  browserAccess(token){
  	return this._http.post("https://www.improving.com.br/api/test/hits-by-browser", token)
  		.map(result => result);
  }

  monthTemperature(token){
  	return this._http.post("https://www.improving.com.br/api/test/city-temperatures", token)
  		.map(result => result);
  }

}
