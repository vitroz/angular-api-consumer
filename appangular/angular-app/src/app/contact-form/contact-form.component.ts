import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {HttpErrorResponse } from '@angular/common/http';
import { PostComponentService } from '../post-component/post-component.service';
import { ApiService } from '../apiservice.service';
import { Chart } from 'chart.js';



@Component({
  selector: 'contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {

  constructor(private service: PostComponentService, private _chartService: ApiService) { }

  showChart = false;
  showTables = false;
  browsers = []; //dados da tabela
  percentageAcess = []; //dados da tabela

  toggleShow(){
    this.showChart = true;
  }

  showTable(){
    this.showTables = true;
    var data = {token: "0a1b2c3d"}; //refatorar
    this.plotTables(data);
  }

  calculaMediaTemperaturaPorMes(res,cidadeIdx,mes){
    var diaMes = "";
    var temperatura = "";
    var qtdDiasMes = 0;
    var somaTemperaturas = 0;
    var mediaTemperaturaMes = 0;

    for(var i = 0; i < res.length; i++){
      for(var j = 0; j < res[i].data.length; j++){
        diaMes = res[i].data[j][0];
        temperatura = res[i].data[j][1];
        if(i == cidadeIdx && diaMes.slice(-3) == mes){
          somaTemperaturas += parseFloat(temperatura);
          qtdDiasMes++;
        }
      }
      if(i == cidadeIdx ){
        mediaTemperaturaMes = somaTemperaturas/qtdDiasMes;
        mediaTemperaturaMes = parseFloat(mediaTemperaturaMes.toFixed(1));
      }
    }
    return mediaTemperaturaMes;
  }

  plotCharts(token){
    let chart = <any>{};
    let chart2 = <any>{};

    this._chartService.browserAccess(token)
      .subscribe((res: any[]) => {

        let browsers = [];
        let browsersAcesss = [];
        var total = 0;
        let percentageAcess = [];
        var percent = 0;

        if(res !== null){
          for(var i = 0; i < res.length; i++){
            browsers.push(res[i][0]);
            browsersAcesss.push(res[i][1]);
          }
        }

        for(var i = 0; i < browsersAcesss.length; i++){
          total += browsersAcesss[i];
        }

        for(var i = 0; i < browsersAcesss.length; i++){
          percent = browsersAcesss[i]/total * 100;
          percent = parseFloat(percent.toFixed(2));
          percentageAcess.push(percent);
          percent = 0;
        }       

        var ctx = document.getElementById("canvas");

        chart = new Chart(ctx, {
          type: 'doughnut',
          data: {
            labels: browsers,
            datasets: [
              {
                data: percentageAcess,
                backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
                fill: false
              }
            ]
          },
          options: {
              title: {
                display: true,
                text: 'Distribuição dos acessos por browser'
              },
                    tooltips: {
                        enabled: true,
                        mode: 'single',
                        callbacks: {
                        label: function(tooltipItem, data) { 
                          var allData = data.datasets[tooltipItem.datasetIndex].data;
                    var tooltipLabel = data.labels[tooltipItem.index];
                    var tooltipData = allData[tooltipItem.index];
                    return tooltipLabel + ": " + tooltipData + "%";
                        }
                    }
                }
        }
      })
  });

  this._chartService.monthTemperature(token)
      .subscribe((res: any[]) => {

      let cities = [];
      let mediaTempsMesC1 = [];
      let mediaTempsMesC2 = [];
      let mediaTempsMesC3 = [];
      

      if(res !== null){
        for(var i = 0; i < res.length; i++){
          cities.push(res[i].name);
        }
      }

      //refatorar
      mediaTempsMesC1.push(this.calculaMediaTemperaturaPorMes(res,0,"-01"));
      mediaTempsMesC1.push(this.calculaMediaTemperaturaPorMes(res,0,"-02"));
      mediaTempsMesC1.push(this.calculaMediaTemperaturaPorMes(res,0,"-03"));
      mediaTempsMesC1.push(this.calculaMediaTemperaturaPorMes(res,0,"-04"));
      mediaTempsMesC1.push(this.calculaMediaTemperaturaPorMes(res,0,"-05"));
      mediaTempsMesC1.push(this.calculaMediaTemperaturaPorMes(res,0,"-06"));
      mediaTempsMesC1.push(this.calculaMediaTemperaturaPorMes(res,0,"-07"));
      mediaTempsMesC1.push(this.calculaMediaTemperaturaPorMes(res,0,"-08"));
      mediaTempsMesC1.push(this.calculaMediaTemperaturaPorMes(res,0,"-09"));
      mediaTempsMesC1.push(this.calculaMediaTemperaturaPorMes(res,0,"-10"));
      mediaTempsMesC1.push(this.calculaMediaTemperaturaPorMes(res,0,"-11"));
      mediaTempsMesC1.push(this.calculaMediaTemperaturaPorMes(res,0,"-12"));

      mediaTempsMesC2.push(this.calculaMediaTemperaturaPorMes(res,1,"-01"));
      mediaTempsMesC2.push(this.calculaMediaTemperaturaPorMes(res,1,"-02"));
      mediaTempsMesC2.push(this.calculaMediaTemperaturaPorMes(res,1,"-03"));
      mediaTempsMesC2.push(this.calculaMediaTemperaturaPorMes(res,1,"-04"));
      mediaTempsMesC2.push(this.calculaMediaTemperaturaPorMes(res,1,"-05"));
      mediaTempsMesC2.push(this.calculaMediaTemperaturaPorMes(res,1,"-06"));
      mediaTempsMesC2.push(this.calculaMediaTemperaturaPorMes(res,1,"-07"));
      mediaTempsMesC2.push(this.calculaMediaTemperaturaPorMes(res,1,"-08"));
      mediaTempsMesC2.push(this.calculaMediaTemperaturaPorMes(res,1,"-09"));
      mediaTempsMesC2.push(this.calculaMediaTemperaturaPorMes(res,1,"-10"));
      mediaTempsMesC2.push(this.calculaMediaTemperaturaPorMes(res,1,"-11"));
      mediaTempsMesC2.push(this.calculaMediaTemperaturaPorMes(res,1,"-12"));

      mediaTempsMesC3.push(this.calculaMediaTemperaturaPorMes(res,2,"-01"));
      mediaTempsMesC3.push(this.calculaMediaTemperaturaPorMes(res,2,"-02"));
      mediaTempsMesC3.push(this.calculaMediaTemperaturaPorMes(res,2,"-03"));
      mediaTempsMesC3.push(this.calculaMediaTemperaturaPorMes(res,2,"-04"));
      mediaTempsMesC3.push(this.calculaMediaTemperaturaPorMes(res,2,"-05"));
      mediaTempsMesC3.push(this.calculaMediaTemperaturaPorMes(res,2,"-06"));
      mediaTempsMesC3.push(this.calculaMediaTemperaturaPorMes(res,2,"-07"));
      mediaTempsMesC3.push(this.calculaMediaTemperaturaPorMes(res,2,"-08"));
      mediaTempsMesC3.push(this.calculaMediaTemperaturaPorMes(res,2,"-09"));
      mediaTempsMesC3.push(this.calculaMediaTemperaturaPorMes(res,2,"-10"));
      mediaTempsMesC3.push(this.calculaMediaTemperaturaPorMes(res,2,"-11"));
      mediaTempsMesC3.push(this.calculaMediaTemperaturaPorMes(res,2,"-12"));

      var ctx2 = document.getElementById("canvas2");

      chart2 = new Chart(ctx2, {
        type: 'line',
        lineTension: 0.1,
        data: {
          labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
          datasets: [{
            label: cities[0],
            backgroundColor: ["#be4a47"],
            borderColor: ["#D14A2D"],
            pointHoverBackgroundColor: "#be4a47",
            fill: false,
            data: mediaTempsMesC1
          }, {
            label: cities[1],
            backgroundColor: ["#456BF9"],
            borderColor: ["#1D4BF3"],
            pointHoverBackgroundColor: "#456bf9",
            fill: false,
            data: mediaTempsMesC2
          }, {
            label: cities[2],
            backgroundColor: ["#0F811C"],
            borderColor: ["#1DB42D"],
            pointHoverBackgroundColor: "#0F811C",
            fill: false,
            data: mediaTempsMesC3
          }]
        },
        options: {
          responsive: true,
          title: {
            display: true,
            text: 'Temperatura média por mês'
          },
          scales: {
            xAxes: [{
              display: true,
            }],
            yAxes: [{
              display: true,
              type: 'linear',
            }]
          }
        }
      });
    });
  }

  ngOnInit() {
  }

  criar(){
  	this.service.criar().subscribe(
      (data: any[]) => {
  		console.log(data);
      if(data != null){
        this.toggleShow();
        this.plotCharts(data);
      }
  	},
      (err: HttpErrorResponse) => {
        if(err.status == 400){
          alert(err.error.message);
        }else if(err.status == 409){
          alert("O email informado já existe.");
        }else{
          alert("Erro de comunicação, favor tentar novamente mais tarde.");
        }
        
      }
    );
  }

  plotTables(token){
        this._chartService.browserAccess(token)
          .subscribe((res: any[]) => {

            let browsers = [];
            let browsersAcesss = [];
            var total = 0;
            let percentageAcess = [];
            var percent = 0;

            if(res !== null){
              for(var i = 0; i < res.length; i++){
                browsers.push(res[i][0]);
                this.browsers.push(res[i][0]);
                browsersAcesss.push(res[i][1]);
              }
            }

            for(var i = 0; i < browsersAcesss.length; i++){
              total += browsersAcesss[i];
            }

            for(var i = 0; i < browsersAcesss.length; i++){
              percent = browsersAcesss[i]/total * 100;
              percent = parseFloat(percent.toFixed(2));
              percentageAcess.push(percent);
              this.percentageAcess.push(percent);
              percent = 0;
            }       
        });
    }

}

