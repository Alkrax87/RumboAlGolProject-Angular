import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataLoadService } from '../../../services/data-load.service';

@Component({
  selector: 'app-eliminatorias-main',
  templateUrl: './eliminatorias-main.component.html',
  styleUrl: './eliminatorias-main.component.css'
})
export class EliminatoriasMainComponent {
  //Valor que se envia para la gestion de la data (JSON)
  value:number = 5;

  //Valor recibido para la carga del mainPage
  mainPage:boolean = true;

  constructor(private route: ActivatedRoute, private dataLoadService: DataLoadService){}

  ngOnInit() {
    //Asignamos el valor recibido a la variable mainPage
    this.route.paramMap.subscribe(params => {
      this.mainPage = params.get('mainPage') === 'true'
    });
    this.loadData();
  }

  //Cargar Data del JSON
  data:any;
  loadData() {
    this.dataLoadService.loadData(this.value).then((data: any) => {
      this.data = data;
    }).catch(error => {
      console.error('Error al cargar datos en el componente:', error);
    });
  }
}
