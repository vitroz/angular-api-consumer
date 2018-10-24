import { Component } from '@angular/core';
import { ApiService } from './apiservice.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  

	constructor(private _chartService: ApiService) {}

	ngOnInit(){
	}


}

