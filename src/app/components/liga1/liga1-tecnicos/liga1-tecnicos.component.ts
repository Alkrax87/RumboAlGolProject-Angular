import { Component } from '@angular/core';
import { DataLoadService } from '../../../services/data-load.service';

@Component({
  selector: 'app-liga1-tecnicos',
  templateUrl: './liga1-tecnicos.component.html',
  styleUrl: './liga1-tecnicos.component.css'
})
export class Liga1TecnicosComponent {
  constructor(private dataLoadService: DataLoadService){}

  ngOnInit() {
    this.loadData();
  }

  // Cargar Data del JSON
  data:any;
  loadData() {
    this.dataLoadService.loadData(1).then((data: any) => {
      this.data = data;
    }).catch(error => {
      console.error('Error al cargar datos en el componente:', error);
    });
  }
}