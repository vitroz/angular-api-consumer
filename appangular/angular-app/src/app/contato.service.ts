import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContatoService {

  contatosUrl = 'https://www.improving.com.br/api/test/hits-by-browser';

  constructor(private http: HttpClient) { }

  listar(){
  	return this.http.get<any[]>(`${this.contatosUrl}`);
  }

}
