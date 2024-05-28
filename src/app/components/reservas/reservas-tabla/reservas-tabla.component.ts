import { Component } from '@angular/core';
import { DataLoadService } from '../../../services/data-load.service';

@Component({
  selector: 'app-reservas-tabla',
  templateUrl: './reservas-tabla.component.html',
  styleUrl: './reservas-tabla.component.css'
})
export class ReservasTablaComponent {
  constructor(private dataLoadService: DataLoadService){}

  ngOnInit() {
    this.loadData();
  }

  data:any;  // Cargar Data del JSON

  // Objetos fase regular
  norte:any;  // Data grupo norte
  sur:any;  // Data grupo sur

  // Objetos clasificados
  clasifiers:any;

  loadData() {
    this.dataLoadService.loadData(6).then((data: any) => {
      this.data = data;
      this.norte = this.sortDataTeamsNorte([...data.Teams]);
      this.sur = this.sortDataTeamsSur([...data.Teams]);
    }).catch(error => {
      console.error('Error al cargar datos en el componente:', error);
    });
  }

  // Separar por grupos
  splitGroups(data:any, value:number){
    // Declaracion de Array de items
    const group = [];
    let index = 0;
    for (const item of data) {
      if (value === 1) {
        if (item.grupo === "norte") {
          item.index = index;
          group.push(item);
        }
      } else if (value === 2){
        if (item.grupo === "sur"){
          item.index = index;
          group.push(item);
        }
      }
      index++;
    }
    return group;
  }

  // Ordenar tabla norte
  sortDataTeamsNorte(dataN: any) {
    // Seleccionar por grupo
    let teams = this.splitGroups(dataN, 1);

    // Declaracion de Array de items
    const teamsArray = [];

    for (const item of teams) {
      // Definicion de objeto
      var team = {
        "image": item.image,
        "alt": item.alt,
        "name": item.name,
        "url": item.url,
        "index": item.index,
        "puntos": (item.data.pg * 3) + item.data.pe,
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

  // Ordenar tabla sur
  sortDataTeamsSur(dataS: any) {
    // Seleccionar por grupo
    let teams = this.splitGroups(dataS, 2);

    // Declaracion de Array de items
    const teamsArray = [];

    for (const item of teams) {
      // Definicion de objeto
      var team = {
        "image": item.image,
        "alt": item.alt,
        "name": item.name,
        "url": item.url,
        "index": item.index,
        "puntos": (item.data.pg * 3) + item.data.pe,
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
