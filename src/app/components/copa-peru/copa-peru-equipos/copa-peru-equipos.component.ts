import { Component } from '@angular/core';
import { DataLoadService } from '../../../services/data-load.service';

@Component({
  selector: 'app-copa-peru-equipos',
  templateUrl: './copa-peru-equipos.component.html',
  styleUrl: './copa-peru-equipos.component.css'
})
export class CopaPeruEquiposComponent {
  constructor(private dataLoadService: DataLoadService){}

  ngOnInit() {
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

  getTeamById(id: string) {
    return this.data.Teams.find((team: any) => team.id === id);
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
