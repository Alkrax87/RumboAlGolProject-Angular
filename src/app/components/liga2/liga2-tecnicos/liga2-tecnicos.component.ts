import { Component } from '@angular/core';
import { DataLoadService } from '../../../services/data-load.service';

@Component({
  selector: 'app-liga2-tecnicos',
  templateUrl: './liga2-tecnicos.component.html',
  styleUrl: './liga2-tecnicos.component.css'
})
export class Liga2TecnicosComponent {
  constructor(private dataLoadService: DataLoadService){}

  ngOnInit() {
    this.loadData();
  }

  // Cargar Data del JSON
  data:any;
  loadData() {
    this.dataLoadService.loadData(2).then((data: any) => {
      this.data = data;
    }).catch(error => {
      console.error('Error al cargar datos en el componente:', error);
    });
  }
}
