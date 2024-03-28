import { Component } from '@angular/core';
import { DataLoadService } from '../../../services/data-load.service';

@Component({
  selector: 'app-liga2-equipos',
  templateUrl: './liga2-equipos.component.html',
  styleUrl: './liga2-equipos.component.css'
})
export class Liga2EquiposComponent {
  constructor(private dataLoadService: DataLoadService){}

  ngOnInit() {
    this.loadData();
  }

  //Cargar Data del JSON
  data:any;
  loadData() {
    this.dataLoadService.loadData(2).then((data: any) => {
      this.data = data;
    }).catch(error => {
      console.error('Error al cargar datos en el componente:', error);
    });
  }

  //Efecto hover
  hoveredItem: any;
  onItemHover(item: any) {
    this.hoveredItem = item;
  }
  onItemLeave() {
    this.hoveredItem = null;
  }
}
