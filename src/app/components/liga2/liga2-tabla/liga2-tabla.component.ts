import { Component } from '@angular/core';
import { DataLoadService } from '../../../services/data-load.service';

@Component({
  selector: 'app-liga2-tabla',
  templateUrl: './liga2-tabla.component.html',
  styleUrl: './liga2-tabla.component.css'
})
export class Liga2TablaComponent {
  constructor(private dataLoadService: DataLoadService){}

  ngOnInit() {
    this.loadData();
  }

  data:any;  // Cargar Data del JSON

  // Objetos fase regular
  norte:any;  // Data grupo norte
  sur:any;  // Data grupo sur

  // Objetos fase playoff
  ascenso1:any;
  ascenso2:any;
  descenso:any;

  // Objetos clasificados
  clasifiers:any;

  // Objetos semifinal
  semifinalist:any[] = [];

  // Objeto final
  finalist:any[] = [];
  finalResults:any[] =[];

  // Ascendidos Index
  n1:any
  n2:any

  loadData() {
    this.dataLoadService.loadData(2).then((data: any) => {
      this.data = data;
      this.norte = this.sortDataTeamsNorte([...data.Teams]);
      this.sur = this.sortDataTeamsSur([...data.Teams]);

      // Playoff
      if (data.Info.playoff){
        this.selectTeams([...this.norte],[...this.sur]);
        this.ascenso1 = this.sortDataTeamsGA();
        this.ascenso2 = this.sortDataTeamsGB();
        this.descenso = this.sortDataTeamsGR();
      }

      // Eliminatorias
      if (data.Info.cuartos){
        this.selectTeamsFinals(this.ascenso1,this.ascenso2)
      }

      // Eliminatorias
      if (data.Info.semifinal){
        this.semifinalSelector()
      }

      // Final
      if (data.Info.final) {
        this.semifinalSet()

        if (data.Final.teamA != null && data.Final.teamB != null) {
          let winner = this.bracketWinner(0,data.Final.teamA,data.Final.penal.teamA,1,data.Final.teamB,data.Final.penal.teamB)

          if (winner == 0) {
            this.n1 = 0
            this.n2 = 1
          } else {
            this.n1 = 1
            this.n2 = 0
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
        "puntos": (item.data.pg * 3) + item.data.pe - item.data.sanction,
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
        "puntos": (item.data.pg * 3) + item.data.pe - item.data.sanction,
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
  selectTeams(grupoNorte: any, grupoSur: any) {
    let ascenso1 = [];
    let ascenso2 = [];
    let descenso = [];

    for (let i = 0; i < 6; i += 2) {
      ascenso1.push(grupoNorte[i]);
      ascenso1.push(grupoSur[i + 1]);
      ascenso2.push(grupoSur[i]);
      ascenso2.push(grupoNorte[i + 1]);
    }

    for (let i = 6; i < 9; i++) {
      descenso.push(grupoNorte[i]);
      descenso.push(grupoSur[i]);
    }

    descenso.splice(2,1);
    descenso.splice(3,1);

    this.ascenso1 = ascenso1;
    this.ascenso2 = ascenso2;
    this.descenso = descenso;
  }

  // Ordenar Grupo A
  sortDataTeamsGA() {
    // Seleccionar por indices los equipos
    const clasifiersGroupA = this.ascenso1.map((element: { index: Number; }) => element.index);

    // Filtramos los los equipos clasificados del Grupo A
    const equiposFiltrados = clasifiersGroupA.map((index: number) => this.data.Teams[index]);

    // Declaracion de Array de items
    const teamsArray = [];

    // Iterador para suma de puntos
    let plus = 0;

    for (const item of equiposFiltrados) {
      // Definicion de objeto
      var team = {
        "image": item.image,
        "alt": item.alt,
        "name": item.name,
        "url": item.url,
        "index": item.index,
        "puntos": (item.dataplayoff.pg * 3) + item.dataplayoff.pe - item.dataplayoff.sanction,
        "pj": item.dataplayoff.pg + item.dataplayoff.pe + item.dataplayoff.pp,
        "pg": item.dataplayoff.pg,
        "pe": item.dataplayoff.pe,
        "pp": item.dataplayoff.pp,
        "gf": item.dataplayoff.gf,
        "gc": item.dataplayoff.gc,
        "dg": (item.dataplayoff.gf - item.dataplayoff.gc) > 0 ? "+"+(item.dataplayoff.gf - item.dataplayoff.gc): (item.dataplayoff.gf - item.dataplayoff.gc),
        "lastGames": item.lastGames
      }

      // Sumar puntos al primer (+2) y segundo (+1) lugar
      switch (plus) {
        case 0:
          team.puntos += 2;
          break;
        case 1:
          team.puntos += 1;
          break;
      }
      plus++

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

  // Ordenar Grupo B
  sortDataTeamsGB() {
    // Seleccionar por indices los equipos
    const clasifiersGroupB = this.ascenso2.map((element: { index: Number; }) => element.index);

    // Filtramos los los equipos clasificados del Grupo A
    const equiposFiltrados = clasifiersGroupB.map((index: number) => this.data.Teams[index]);

    // Declaracion de Array de items
    const teamsArray = [];

    // Iterador para suma de puntos
    let plus = 0;

    for (const item of equiposFiltrados) {
      // Definicion de objeto
      var team = {
        "image": item.image,
        "alt": item.alt,
        "name": item.name,
        "url": item.url,
        "index": item.index,
        "puntos": (item.dataplayoff.pg * 3) + item.dataplayoff.pe - item.dataplayoff.sanction,
        "pj": item.dataplayoff.pg + item.dataplayoff.pe + item.dataplayoff.pp,
        "pg": item.dataplayoff.pg,
        "pe": item.dataplayoff.pe,
        "pp": item.dataplayoff.pp,
        "gf": item.dataplayoff.gf,
        "gc": item.dataplayoff.gc,
        "dg": (item.dataplayoff.gf - item.dataplayoff.gc) > 0 ? "+"+(item.dataplayoff.gf - item.dataplayoff.gc): (item.dataplayoff.gf - item.dataplayoff.gc),
        "lastGames": item.lastGames
      }

      // Sumar puntos al primer (+2) y segundo (+1) lugar
      switch (plus) {
        case 0:
          team.puntos += 2;
          break;
        case 1:
          team.puntos += 1;
          break;
      }
      plus++

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

  // Ordenar Grupo Descenso
  sortDataTeamsGR() {
    // Seleccionar por indices los equipos
    const clasifiersRelegation = this.descenso.map((element: { index: Number; }) => element.index);

    // Filtramos los los equipos clasificados del Grupo A
    const equiposFiltrados = clasifiersRelegation.map((index: number) => this.data.Teams[index]);

    // Declaracion de Array de items
    const teamsArray = [];

    for (const item of equiposFiltrados) {
      // Definicion de objeto
      var team = {
        "image": item.image,
        "alt": item.alt,
        "name": item.name,
        "url": item.url,
        "index": item.index,
        "puntos": (item.dataplayoff.pg * 3) + item.dataplayoff.pe - item.dataplayoff.sanction,
        "pj": item.dataplayoff.pg + item.dataplayoff.pe + item.dataplayoff.pp,
        "pg": item.dataplayoff.pg,
        "pe": item.dataplayoff.pe,
        "pp": item.dataplayoff.pp,
        "gf": item.dataplayoff.gf,
        "gc": item.dataplayoff.gc,
        "dg": (item.dataplayoff.gf - item.dataplayoff.gc) > 0 ? "+"+(item.dataplayoff.gf - item.dataplayoff.gc): (item.dataplayoff.gf - item.dataplayoff.gc),
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

  // Seleccionar Clasificados Fases Eliminatorias
  selectTeamsFinals(asc1:any, asc2:any){
    let clasificados = [];
    for (let i = 0; i < 3; i++) {
      clasificados.push(asc1[i])
      clasificados.push(asc2[i])
    }
    this.clasifiers = clasificados;
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

  // Seleccionar equipos ganadores de la Fase Eliminatoria
  semifinalSelector(){
    this.semifinalist.push(this.clasifiers[0])
    this.semifinalist.push(this.clasifiers[1])
    this.semifinalist.push(this.clasifiers[this.bracketWinner(2,(this.data.Cuartos[0].idaA + this.data.Cuartos[0].vueltaA),(this.data.Cuartos[0].penal.teamA),5,(this.data.Cuartos[0].idaB + this.data.Cuartos[0].vueltaB),(this.data.Cuartos[0].penal.teamB))])
    this.semifinalist.push(this.clasifiers[this.bracketWinner(3,(this.data.Cuartos[1].idaA + this.data.Cuartos[1].vueltaA),(this.data.Cuartos[1].penal.teamA),4,(this.data.Cuartos[1].idaB + this.data.Cuartos[1].vueltaB),(this.data.Cuartos[1].penal.teamB))])
  }

  // Calculos Semifinal
  semifinalSet(){
    let semifinalResults = [];
    if (this.data.Semifinal[0].vueltaA != null && this.data.Semifinal[0].vueltaB != null) {
      semifinalResults.push(
        {
          "globalA": this.data.Semifinal[0].idaA + this.data.Semifinal[0].vueltaA,
          "globalB": this.data.Semifinal[0].idaB + this.data.Semifinal[0].vueltaB,
          "penalA": this.data.Semifinal[0].penal.teamA,
          "penalB": this.data.Semifinal[0].penal.teamB
        }
      )
    }
    if (this.data.Semifinal[1].vueltaA != null && this.data.Semifinal[1].vueltaB != null) {
      semifinalResults.push(
        {
          "globalA": this.data.Semifinal[1].idaA + this.data.Semifinal[1].vueltaA,
          "globalB": this.data.Semifinal[1].idaB + this.data.Semifinal[1].vueltaB,
          "penalA": this.data.Semifinal[1].penal.teamA,
          "penalB": this.data.Semifinal[1].penal.teamB
        }
      )
    }
    this.finalist.push(this.semifinalist[this.bracketWinner(0,(semifinalResults[0].globalA),(semifinalResults[0].penalA),2,(semifinalResults[0].globalB),(semifinalResults[0].penalB))])
    this.finalist.push(this.semifinalist[this.bracketWinner(1,(semifinalResults[1].globalA),(semifinalResults[1].penalA),3,(semifinalResults[1].globalB),(semifinalResults[1].penalB))])
  }
}
