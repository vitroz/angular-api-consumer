import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as $ from 'jquery';

@Injectable({
	providedIn: 'root'
})
export class PostComponentService {

	formPostUrl = "https://www.improving.com.br/api/test/users";

	constructor(private http: HttpClient) { }

	listar() {
		return this.http.get<Array<any>>(this.formPostUrl);
	}

	objectifyForm(formArray) {//serialize data function

	  var returnArray = {};
	  for (var i = 0; i < formArray.length; i++){
	    returnArray[formArray[i]['name']] = formArray[i]['value'];
	  }
	  return returnArray;
	}

	criar() {
		var rawData = $("#nvForm").serializeArray();
		let postData = <any>{};
		postData = this.objectifyForm(rawData);
		delete postData.passwordConfirmation; //API rejeita esta key;
		postData.country = $("#country").val();
		return this.http.post(this.formPostUrl, postData);
	}

}