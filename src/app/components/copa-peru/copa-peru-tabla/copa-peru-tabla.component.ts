import { Component } from '@angular/core';
import { DataLoadService } from '../../../services/data-load.service';

@Component({
  selector: 'app-copa-peru-tabla',
  templateUrl: './copa-peru-tabla.component.html',
  styleUrl: './copa-peru-tabla.component.css'
})
export class CopaPeruTablaComponent {
  constructor(private dataLoadService: DataLoadService) {}

  ngOnInit(){
    this.loadData();
  }

  data:any;
  teams:any;

  loadData(){
    this.dataLoadService.loadData(4).then((data: any) => {
      this.teams = this.sortDataTeams([...data.Teams]);
    }).catch(error => {
      console.error('Error al cargar datos en el componente:', error);
    });
  }

  sortDataTeams(data:any){

    // Declaracion de Array de items
    const teamsArray = [];

    // Iterador equipos
    for (const item of data) {

      // Definicion de objeto
      var team = {
        "image": item.image,
        "alt": item.alt,
        "name": item.name,
        "url": item.url,
        "puntos": ((item.data.pg * 3) + item.data.pe) - item.data.sanction,
        "pj": item.data.pg + item.data.pe + item.data.pp,
        "pg": item.data.pg,
        "pe": item.data.pe,
        "pp": item.data.pp,
        "gf": item.data.gf,
        "gc": item.data.gc,
        "dg": (item.data.gf - item.data.gc) > 0 ? "+"+(item.data.gf - item.data.gc): (item.data.gf - item.data.gc),
        "pr": item.data.pr,
        "lastGames": item.lastGames
      }

      // Agregar al array
      teamsArray.push(team)
    }

    // Ordenar el array en base criterios
    teamsArray.sort((a:any, b:any) => {
      if (a.puntos !== b.puntos) {
        return b.puntos - a.puntos;
      }
      if (a.pr !== b.pr) {
        return b.pr - a.pr;
      }
      if (a.dg !== b.dg) {
        return b.dg - a.dg;
      }
      return b.gf - a.gf;
    });

    return teamsArray;
  }
}