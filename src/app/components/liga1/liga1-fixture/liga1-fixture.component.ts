import { Component } from '@angular/core';
import { DataLoadService } from '../../../services/data-load.service';

interface Team {
  id: string;
  name: string;
  image: string;
  alt: string;
}

interface MatchResult {
  home: number | null;
  away: number | null;
}

interface MatchCard {
  homeTeam: Team;
  awayTeam: Team;
  result: MatchResult;
  round: string;
}

@Component({
  selector: 'app-liga1-fixture',
  templateUrl: './liga1-fixture.component.html',
  styleUrl: './liga1-fixture.component.css'
})
export class Liga1FixtureComponent {
  constructor(private dataLoadService: DataLoadService){}

  // Variable para almacenar el indice de la jornada en juego
  selectedFixtureA: any;
  selectedFixtureC: any;

  // Estado del torneo en juego
  fixtureA:boolean = false;
  fixtureC:boolean = false;

  ngOnInit() {
    this.loadData();
  }

  activeButton: number | null = null;

  // Cargar Data del JSON
  data: any;
  loadData() {
    this.dataLoadService.loadData(1).then((data: any) => {
      this.data = data;
      // Verifica que la data esté cargada y llamamos a la funcion del fixture
      if (this.data) {
        this.selectedFixtureA = this.data.Info.fechaApertura;
        this.selectedFixtureC = this.data.Info.fechaClausura;
        this.fixtureA = this.data.Info.apertura;
        this.fixtureC = this.data.Info.clausura;
        if (this.fixtureA) {
          this.fixtureSwitch(1);
        } else if (this.fixtureC) {
          this.fixtureSwitch(2);
        }
        this.showMatchResultsA();
        this.showMatchResultsC();
      }
    }).catch(error => {
      console.error('Error al cargar datos en el componente:', error);
    });
  }

  fixtureSwitch(value: number): void {
    if (this.activeButton === value) {
      this.activeButton = null; // Desactiva el botón si ya está activo
    } else {
      this.activeButton = value;
    }
    this.fixtureA = value === 1;
    this.fixtureC = value === 2;
  }

  // Variable que almacena las llaves con un atributo de la jornada a la que pertenecen
  matchesByRoundA: any;
  matchesByRoundC: any;

  // Variable que almacena el numero de jornadas
  fixtureIndexA:any;
  fixtureIndexC:any;

  // Proceso de mostrar Fixture y filtrar por cada jornada
  showMatchResultsA() {

    //Almacena todo el fixture del apertura o clausura en la variable matches
    const matches = this.data.Fixture.apertura;

    // Creamos un array para almacenar todas las llaves en la variable matchCards todavia sin el filtro por jornada
    const matchCards: MatchCard[] = [];

    // Creamos un array para guardar el numero de jornadas como un array
    const fixtureRounds: number[] = [];

    // Iterar sobre las jornadas y partidos y crear los MatchCard
    for (const key in matches) {

      // Almacenamos las llaves en la variable round filtrandolas por cada jornada
      const round = matches[key];

      //Almacenamos el numero de fechas como indices para usarlo en el Select
      fixtureRounds.push(Number(key));

      //Iteramos en cada llave dentro de round para asignar los resultados de cada partido
      round.forEach((match: { home: string; away: string }) => {
        // Buscar información sobre los equipos en el array de equipos
        const homeTeam: Team = this.data.Teams.find((team: Team) => team.id === match.home) || { id: "", name: "Por Definir", image: "", alt: "" };
        const awayTeam: Team = this.data.Teams.find((team: Team) => team.id === match.away) || { id: "", name: "Por Definir", image: "", alt: "" };

         // Obtener resultados del partido de cada equipo
         let result: MatchResult;
         if (homeTeam.id === "" || homeTeam.name === "Por Definir" || awayTeam.id === "" || awayTeam.name === "Por Definir") {
           result = { home: null, away: null };
         } else {
           result = this.getRealResultA(homeTeam, awayTeam, Number(key));
         }

        // Crear el MatchCard con la informacion de los equipos y el resultado
        const matchCard: MatchCard = {
          homeTeam,
          awayTeam,
          result,
          round: key // Agrega la jornada a la que pertenece esa llave
        };

        //Agregar al array de matchCards las llaves con el filtro por cada joranda
        matchCards.push(matchCard);
      });
      this.matchesByRoundA = matchCards;
      this.fixtureIndexA = fixtureRounds;
    }
  }

  // Función para obtener el resultado real
  getRealResultA(teamHome: any, teamAway: any, gameNumber: number): MatchResult {
    const TeamH = teamHome.apertura.find((game: any) => game.game === gameNumber);
    const TeamA = teamAway.apertura.find((game: any) => game.game === gameNumber);
    return {
      home: TeamH.score !== null && TeamH.score !== undefined ? TeamH.score : "",
      away: TeamA.score !== null && TeamA.score !== undefined ? TeamA.score : "",
    };
  }


  // Proceso de mostrar Fixture y filtrar por cada jornada
  showMatchResultsC() {

    //Almacena todo el fixture del apertura o clausura en la variable matches
    const matches = this.data.Fixture.clausura;

    // Creamos un array para almacenar todas las llaves en la variable matchCards todavia sin el filtro por jornada
    const matchCards: MatchCard[] = [];

    // Creamos un array para guardar el numero de jornadas como un array
    const fixtureRounds: number[] = [];

    // Iterar sobre las jornadas y partidos y crear los MatchCard
    for (const key in matches) {

      // Almacenamos las llaves en la variable round filtrandolas por cada jornada
      const round = matches[key];

      //Almacenamos el numero de fechas como indices para usarlo en el Select
      fixtureRounds.push(Number(key));

      //Iteramos en cada llave dentro de round para asignar los resultados de cada partido
      round.forEach((match: { home: string; away: string }) => {
        // Buscar información sobre los equipos en el array de equipos
        const homeTeam: Team = this.data.Teams.find((team: Team) => team.id === match.home) || { id: "", name: "Por Definir", image: "", alt: "" };
        const awayTeam: Team = this.data.Teams.find((team: Team) => team.id === match.away) || { id: "", name: "Por Definir", image: "", alt: "" };

         // Obtener resultados del partido de cada equipo
         let result: MatchResult;
         if (homeTeam.id === "" || homeTeam.name === "Por Definir" || awayTeam.id === "" || awayTeam.name === "Por Definir") {
           result = { home: null, away: null };
         } else {
           result = this.getRealResultC(homeTeam, awayTeam, Number(key));
         }

        // Crear el MatchCard con la informacion de los equipos y el resultado
        const matchCard: MatchCard = {
          homeTeam,
          awayTeam,
          result,
          round: key // Agrega la jornada a la que pertenece esa llave
        };

        //Agregar al array de matchCards las llaves con el filtro por cada joranda
        matchCards.push(matchCard);
      });
      this.matchesByRoundC = matchCards;
      this.fixtureIndexC = fixtureRounds;
    }
  }

  // Función para obtener el resultado
  getRealResultC(teamHome: any, teamAway: any, gameNumber: number): MatchResult {
    const TeamH = teamHome.clausura.find((game: any) => game.game === gameNumber);
    const TeamA = teamAway.clausura.find((game: any) => game.game === gameNumber);
    return {
      home: TeamH.score !== null && TeamH.score !== undefined ? TeamH.score : "",
      away: TeamA.score !== null && TeamA.score !== undefined ? TeamA.score : "",
    };
  }
}
