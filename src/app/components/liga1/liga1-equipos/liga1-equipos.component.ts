import { Component } from '@angular/core';
import { DataLoadService } from '../../../services/data-load.service';

@Component({
  selector: 'app-liga1-equipos',
  templateUrl: './liga1-equipos.component.html',
  styleUrl: './liga1-equipos.component.css'
})
export class Liga1EquiposComponent {
  constructor(private dataLoadService: DataLoadService){}

  ngOnInit() {
    this.loadData();
  }

  //Cargar Data del JSON
  data:any;
  loadData() {
    this.dataLoadService.loadData(1).then((data: any) => {
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
