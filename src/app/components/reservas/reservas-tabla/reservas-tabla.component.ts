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
  octavos:any;
  cuartos:any;
  semifinalist:any;
  finalist:any;
  champion:any;

  loadData() {
    this.dataLoadService.loadData(6).then((data: any) => {
      this.data = data;
      this.norte = this.sortDataTeamsNorte([...data.Teams]);
      this.sur = this.sortDataTeamsSur([...data.Teams]);

      // Playoff
      if (data.Info.playoff){
        this.selectClasifiers([...this.norte],[...this.sur]);
      }

      // Cuartos
      if (data.Info.cuartos){
        this.octavosSelector();
      }

      // Semifinal
      if (data.Info.semifinal) {
        this.semifinalSelector();
      }

      // Final
      if (data.Info.final) {
        this.finalSelector();
        if (data.Final.teamA != null && data.Final.teamB != null) {
          let winner = this.bracketWinner(0,data.Final.teamA,data.Final.penal.teamA,1,data.Final.teamB,data.Final.penal.teamB)

          if (winner == 0) {
            this.champion = this.finalist[0];
          } else {
            this.champion = this.finalist[1];
          }
        }
      }

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

  // Seleccionar Clasificados
  selectClasifiers(dataN:any, dataS:any){
    let octavos = [];
    let cuartos = [];
    for (let i = 0; i < 6; i++) {
      if (i < 2) {
        cuartos.push(dataN[i])
        cuartos.push(dataS[i])
      } else {
        octavos.push(dataN[i])
        octavos.push(dataS[i])
      }
    }
    this.octavos = octavos;
    this.cuartos = cuartos;
  }

  // Funcion que calcula que equipo clasifica en cada bracket
  bracketWinner(teamAIndex:number, goalsA:number, penaltyA:number, teamBIndex:number, goalsB:number, penaltyB:number){
    if (penaltyA && penaltyB) {
      if (penaltyA > penaltyB) {
        return teamAIndex;
      } else {
        return teamBIndex;
      }
    } else {
      if (goalsA > goalsB) {
        return teamAIndex;
      } else {
        return teamBIndex;
      }
    }
  }

  // Calcular resultados Octavos y seleccionar clasificados
  octavosSelector(){
    this.cuartos.push(this.octavos[this.bracketWinner(3,(this.data.Octavos[0].teamA + 0),this.data.Octavos[0].penal.TeamA,4,(this.data.Octavos[0].teamB + 0),this.data.Octavos[0].penal.TeamB)])
    this.cuartos.push(this.octavos[this.bracketWinner(0,(this.data.Octavos[1].teamA + 0),this.data.Octavos[1].penal.TeamA,7,(this.data.Octavos[1].teamB + 0),this.data.Octavos[1].penal.TeamB)])
    this.cuartos.push(this.octavos[this.bracketWinner(2,(this.data.Octavos[2].teamA + 0),this.data.Octavos[2].penal.TeamA,5,(this.data.Octavos[2].teamB + 0),this.data.Octavos[2].penal.TeamB)])
    this.cuartos.push(this.octavos[this.bracketWinner(1,(this.data.Octavos[3].teamA + 0),this.data.Octavos[3].penal.TeamA,6,(this.data.Octavos[3].teamB + 0),this.data.Octavos[3].penal.TeamB)])
  }

  // Calcular resultados Cuartos y seleccionar clasificados
  semifinalSelector(){
    let clasifiers = [];
    clasifiers.push(this.cuartos[this.bracketWinner(0,(this.data.Cuartos[0].idaA + this.data.Cuartos[0].vueltaA),this.data.Cuartos[0].penal.teamA,4,(this.data.Cuartos[0].idaB + this.data.Cuartos[0].vueltaB),this.data.Cuartos[0].penal.teamB)]);
    clasifiers.push(this.cuartos[this.bracketWinner(3,(this.data.Cuartos[1].idaA + this.data.Cuartos[1].vueltaA),this.data.Cuartos[1].penal.teamA,5,(this.data.Cuartos[1].idaB + this.data.Cuartos[1].vueltaB),this.data.Cuartos[1].penal.teamB)]);
    clasifiers.push(this.cuartos[this.bracketWinner(1,(this.data.Cuartos[2].idaA + this.data.Cuartos[2].vueltaA),this.data.Cuartos[2].penal.teamA,6,(this.data.Cuartos[2].idaB + this.data.Cuartos[2].vueltaB),this.data.Cuartos[2].penal.teamB)]);
    clasifiers.push(this.cuartos[this.bracketWinner(2,(this.data.Cuartos[3].idaA + this.data.Cuartos[3].vueltaA),this.data.Cuartos[3].penal.teamA,7,(this.data.Cuartos[3].idaB + this.data.Cuartos[3].vueltaB),this.data.Cuartos[3].penal.teamB)]);
    this.semifinalist = clasifiers;
  }

  // Calcular resultados Cuartos y seleccionar clasificados
  finalSelector(){
    let clasifiers = [];
    clasifiers.push(this.semifinalist[this.bracketWinner(0,(this.data.Semifinal[0].idaA + this.data.Semifinal[0].vueltaA),this.data.Semifinal[0].penal.teamA,1,(this.data.Semifinal[0].idaB + this.data.Semifinal[0].vueltaB),this.data.Semifinal[0].penal.teamB)]);
    clasifiers.push(this.semifinalist[this.bracketWinner(2,(this.data.Semifinal[1].idaA + this.data.Semifinal[1].vueltaA),this.data.Semifinal[1].penal.teamA,3,(this.data.Semifinal[1].idaB + this.data.Semifinal[1].vueltaB),this.data.Semifinal[1].penal.teamB)]);
    this.finalist = clasifiers;
  }
}