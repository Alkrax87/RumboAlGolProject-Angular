import { Component } from '@angular/core';
import { DataLoadService } from '../../../services/data-load.service';

@Component({
  selector: 'app-eliminatorias-tecnicos',
  templateUrl: './eliminatorias-tecnicos.component.html',
  styleUrl: './eliminatorias-tecnicos.component.css'
})
export class EliminatoriasTecnicosComponent {
  constructor(private dataLoadService: DataLoadService){}

  ngOnInit() {
    this.loadData();
  }

  // Cargar Data del JSON
  data:any;
  loadData() {
    this.dataLoadService.loadData(5).then((data: any) => {
      this.data = data;
    }).catch(error => {
      console.error('Error al cargar datos en el componente:', error);
    });
  }
}
