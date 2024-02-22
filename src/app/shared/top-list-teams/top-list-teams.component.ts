import { Component, Input } from '@angular/core';
import { DataLoadService } from '../../services/data-load.service';

@Component({
  selector: 'app-top-list-teams',
  templateUrl: './top-list-teams.component.html',
  styleUrl: './top-list-teams.component.css'
})
export class TopListTeamsComponent {

  //Recuperamos el valor enviado por Liga1MainComponent
  @Input() value: number = 0;

  constructor(private dataLoadService: DataLoadService){}

  data:any;

  ngOnInit() {
    if (this.value != 0) {
      this.loadData(this.value);
    }
  }

  loadData(value:number) {
    this.dataLoadService.loadData(value).then((data: any) => {
      this.data = data;
    }).catch(error => {
      console.error('Error al cargar datos en el componente:', error);
    });
  }
}