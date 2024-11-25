import { Component } from '@angular/core';
import { DataLoadService } from '../../../services/data-load.service';

@Component({
  selector: 'app-liga1-tabla',
  templateUrl: './liga1-tabla.component.html',
  styleUrl: './liga1-tabla.component.css'
})
export class Liga1TablaComponent {
  constructor(private dataLoadService: DataLoadService){}

  ngOnInit() {
    this.loadData();
  }

  data:any;  // Cargar Data del JSON
  apertura:any; // Data apertura ordenada
  clausura:any; // Data clausura ordenada
  acumulado:any; // Data clausura ordenada

  winnerApertura:any; // Equipo ganador del apertura
  winnerClausura:any; // Equipo ganador del clausura

  champion:any;

  loadData() {
    this.dataLoadService.loadData(1).then((data: any) => {
      this.data = data;
      this.apertura = this.sortDataTeamsApertura([...data.Teams]);
      this.clausura = this.sortDataTeamsClausura([...data.Teams]);
      this.acumulado = this.sortDataTeamsAcumulado([...data.Teams]);

      // Asignamos los ganadores del apertura y clausura
      this.winnerApertura = data.Teams.find((element: {id:string}) => element.id === data.Info.winnerTeamApertura);
      this.winnerClausura = data.Teams.find((element: {id:string}) => element.id === data.Info.winnerTeamClausura);

      // Definicion del campeón
      if (data.Info.final) {

        if (this.winnerApertura === this.winnerClausura) {
          this.champion = this.winnerApertura;
        } else {
          const { idaA, vueltaA, penal: { teamA: penalA } } = data.Final;
          const { idaB, vueltaB, penal: { teamB: penalB } } = data.Final;

          if (idaA != null && vueltaA != null && idaB != null && vueltaB != null) {
            const totalA = idaA + vueltaA;
            const totalB = idaB + vueltaB;

            if (totalA > totalB) {
              this.champion = this.winnerApertura;
            } else if (totalB > totalA) {
              this.champion = this.winnerClausura;
            } else if (penalA != null && penalB != null) {
              this.champion = penalA > penalB ? this.winnerApertura : this.winnerClausura;
            }
          }
        }
      }
    }).catch(error => {
      console.error('Error al cargar datos en el componente:', error);
    });
  }

  //Table Status
  table1:boolean = false;
  table2:boolean = false;
  table3:boolean = true;

  // Guardar el estado de la tabla seleccioada
  activeButton: number | null = 1;

  // Funcion para el cambiar de tablas
  tableSwitch(value: number): void {
    if (this.activeButton === value) {
      this.activeButton = null; // Desactiva el botón si ya está activo
    } else {
      this.activeButton = value;
    }
    this.table1 = value === 2;
    this.table2 = value === 3;
    this.table3 = value === 1;
  }

  // Ordenar tabla apertura
  sortDataTeamsApertura(dataA: any) {
    dataA.sort(function(a: { data: { apertura: { pj:number; pg: number; pe: number; pp: number; gf: number; gc: number; puntos:number; dg:string; }; }; },b: { data: { apertura: { pj:number; pg: number; pe: number; pp: number; gf: number; gc: number; puntos:number; dg:string; }; }; }) {
      // Criterio puntaje
      let pointsTeamA = (a.data.apertura.pg * 3) + a.data.apertura.pe;
      let pointsTeamB = (b.data.apertura.pg * 3) + b.data.apertura.pe;
      a.data.apertura.puntos = pointsTeamA;
      b.data.apertura.puntos = pointsTeamB;
      // Criterio diferencia de gol
      let goalDifferenceA = a.data.apertura.gf - a.data.apertura.gc;
      let goalDifferenceB = b.data.apertura.gf - b.data.apertura.gc;
      a.data.apertura.dg = goalDifferenceA > 0 ? "+"+goalDifferenceA : String(goalDifferenceA);
      b.data.apertura.dg = goalDifferenceB > 0 ? "+"+goalDifferenceB : String(goalDifferenceB);
      // Criterio foles a favor
      let goalsA = a.data.apertura.gf;
      let goalsB = b.data.apertura.gf;

      a.data.apertura.pj = a.data.apertura.pg + a.data.apertura.pe + a.data.apertura.pp;
      b.data.apertura.pj = b.data.apertura.pg + b.data.apertura.pe + b.data.apertura.pp;

      // Ordenamiento
      if (pointsTeamB !== pointsTeamA) {
        return pointsTeamB - pointsTeamA;
      } else if (goalDifferenceB !== goalDifferenceA) {
        return goalDifferenceB - goalDifferenceA;
      } else {
        return goalsB - goalsA;
      }
    });
    return dataA;
  }

  // Ordenar tabla clausura
  sortDataTeamsClausura(dataC: any) {
    dataC.sort(function(a: { data: { clausura: { pj:number; pg: number; pe: number; pp: number; gf: number; gc: number; puntos:number; dg:string; }; }; },b: { data: { clausura: { pj:number; pg: number; pe: number; pp: number; gf: number; gc: number; puntos:number; dg:string; }; }; }) {
      // Criterio puntaje
      let pointsTeamA = (a.data.clausura.pg * 3) + a.data.clausura.pe;
      let pointsTeamB = (b.data.clausura.pg * 3) + b.data.clausura.pe;
      a.data.clausura.puntos = pointsTeamA;
      b.data.clausura.puntos = pointsTeamB;
      // Criterio diferencia de gol
      let goalDifferenceA = a.data.clausura.gf - a.data.clausura.gc;
      let goalDifferenceB = b.data.clausura.gf - b.data.clausura.gc;
      a.data.clausura.dg = goalDifferenceA > 0 ? "+"+goalDifferenceA : String(goalDifferenceA);
      b.data.clausura.dg = goalDifferenceB > 0 ? "+"+goalDifferenceB : String(goalDifferenceB);
      // Criterio foles a favor
      let goalsA = a.data.clausura.gf;
      let goalsB = b.data.clausura.gf;

      a.data.clausura.pj = a.data.clausura.pg + a.data.clausura.pe + a.data.clausura.pp;
      b.data.clausura.pj = b.data.clausura.pg + b.data.clausura.pe + b.data.clausura.pp;

      // Ordenamiento
      if (pointsTeamB !== pointsTeamA) {
        return pointsTeamB - pointsTeamA;
      } else if (goalDifferenceB !== goalDifferenceA) {
        return goalDifferenceB - goalDifferenceA;
      } else {
        return goalsB - goalsA;
      }
    });
    return dataC;
  }

  // Ordenar tabla acumulado
  sortDataTeamsAcumulado(acumulado: any) {

    // Declaracion de Array de items
    const teamsArray = [];

    // Iterador para juntar resultados del apertura y clausura
    for (const item of acumulado) {
      // Operaciones
      let puntosAcumulado = (item.data.apertura.pg * 3) + item.data.apertura.pe + (item.data.clausura.pg * 3) + item.data.clausura.pe;
      let pjAcumulado = item.data.apertura.pg + item.data.apertura.pe + item.data.apertura.pp + item.data.clausura.pg + item.data.clausura.pe + item.data.clausura.pp;
      let pgAcumulado = item.data.apertura.pg + item.data.clausura.pg;
      let peAcumulado = item.data.apertura.pe + item.data.clausura.pe;
      let ppAcumulado = item.data.apertura.pp + item.data.clausura.pp;
      let gfAcumulado = item.data.apertura.gf + item.data.clausura.gf;
      let gcAcumulado = item.data.apertura.gc + item.data.clausura.gc;
      let dgAcumulado = (gfAcumulado - gcAcumulado) > 0 ? "+"+(gfAcumulado - gcAcumulado): (gfAcumulado - gcAcumulado)

      // Definicion de objeto
      var team = {
        "image": item.image,
        "alt": item.alt,
        "name": item.name,
        "url": item.url,
        "puntos": puntosAcumulado,
        "pj": pjAcumulado,
        "pg": pgAcumulado,
        "pe": peAcumulado,
        "pp": ppAcumulado,
        "gf": gfAcumulado,
        "gc": gcAcumulado,
        "dg": dgAcumulado,
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