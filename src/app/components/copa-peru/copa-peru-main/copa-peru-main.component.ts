import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataLoadService } from '../../../services/data-load.service';

@Component({
  selector: 'app-copa-peru-main',
  templateUrl: './copa-peru-main.component.html',
  styleUrl: './copa-peru-main.component.css'
})
export class CopaPeruMainComponent {
  // Valor de carga de la descripcion
  value:number = 4;

  //Valor recibido para la carga del mainPage
  mainPage:boolean = true;

  constructor(private route: ActivatedRoute, private dataLoadService: DataLoadService){}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.mainPage = params.get('mainPage') === 'true'
    });
    this.loadData();
  }

  //Cargar Data del JSON
  data:any;
  loadData() {
    this.dataLoadService.loadData(4).then((data: any) => {
      this.data = data;
    }).catch(error => {
      console.error('Error al cargar datos en el componente:', error);
    });
  }
}