import { Component } from '@angular/core';
import { DataLoadService } from '../../../services/data-load.service';

@Component({
  selector: 'app-eliminatorias-tabla',
  templateUrl: './eliminatorias-tabla.component.html',
  styleUrl: './eliminatorias-tabla.component.css'
})
export class EliminatoriasTablaComponent {
  constructor(private dataLoadService: DataLoadService){}

  ngOnInit() {
    this.loadData();
  }

  data:any;  // Cargar Data del JSON
  clasificacion:any; // Data apertura ordenada

  loadData() {
    this.dataLoadService.loadData(5).then((data: any) => {
      this.clasificacion = this.sortDataTeams([...data.Teams]);
    }).catch(error => {
      console.error('Error al cargar datos en el componente:', error);
    });
  }

  sortDataTeams(data: any) {

    // Declaracion de Array de items
    const teamsArray = [];

    // Iterador para juntar resultados del apertura y clausura
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
      if (a.dg !== b.dg) {
          return b.dg - a.dg;
      }
      return b.gf - a.gf;
    });

    return teamsArray;
  }

}
