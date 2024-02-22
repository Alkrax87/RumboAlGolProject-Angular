import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Liga1EquiposComponent } from './components/liga1/liga1-equipos/liga1-equipos.component';
import { Liga1TablaComponent } from './components/liga1/liga1-tabla/liga1-tabla.component';
import { Liga1FixtureComponent } from './components/liga1/liga1-fixture/liga1-fixture.component';
import { Liga1MainComponent } from './components/liga1/liga1-main/liga1-main.component';
import { Liga1TecnicosComponent } from './components/liga1/liga1-tecnicos/liga1-tecnicos.component';
import { Liga2TecnicosComponent } from './components/liga2/liga2-tecnicos/liga2-tecnicos.component';
import { Liga2TablaComponent } from './components/liga2/liga2-tabla/liga2-tabla.component';
import { Liga2FixtureComponent } from './components/liga2/liga2-fixture/liga2-fixture.component';
import { Liga2EquiposComponent } from './components/liga2/liga2-equipos/liga2-equipos.component';
import { Liga2MainComponent } from './components/liga2/liga2-main/liga2-main.component';
import { CopaPeruTablaComponent } from './components/copa-peru/copa-peru-tabla/copa-peru-tabla.component';
import { CopaPeruMainComponent } from './components/copa-peru/copa-peru-main/copa-peru-main.component';
import { CopaPeruEquiposComponent } from './components/copa-peru/copa-peru-equipos/copa-peru-equipos.component';
import { EliminatoriasTecnicosComponent } from './components/eliminatorias/eliminatorias-tecnicos/eliminatorias-tecnicos.component';
import { EliminatoriasEquiposComponent } from './components/eliminatorias/eliminatorias-equipos/eliminatorias-equipos.component';
import { EliminatoriasFixtureComponent } from './components/eliminatorias/eliminatorias-fixture/eliminatorias-fixture.component';
import { EliminatoriasMainComponent } from './components/eliminatorias/eliminatorias-main/eliminatorias-main.component';
import { EliminatoriasTablaComponent } from './components/eliminatorias/eliminatorias-tabla/eliminatorias-tabla.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { TopBarComponent } from './shared/top-bar/top-bar.component';
import { TopListTeamsComponent } from './shared/top-list-teams/top-list-teams.component';
import { HomeComponent } from './components/main/home/home.component';
import { SocialComponent } from './components/main/social/social.component';
import { AboutComponent } from './components/main/about/about.component';
import { DescriptionLeagueComponent } from './shared/description-league/description-league.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    Liga1EquiposComponent,
    Liga1TablaComponent,
    Liga1FixtureComponent,
    Liga1MainComponent,
    Liga1TecnicosComponent,
    Liga2TecnicosComponent,
    Liga2TablaComponent,
    Liga2FixtureComponent,
    Liga2EquiposComponent,
    Liga2MainComponent,
    CopaPeruTablaComponent,
    CopaPeruMainComponent,
    CopaPeruEquiposComponent,
    EliminatoriasTecnicosComponent,
    EliminatoriasEquiposComponent,
    EliminatoriasFixtureComponent,
    EliminatoriasMainComponent,
    EliminatoriasTablaComponent,
    NavbarComponent,
    FooterComponent,
    TopBarComponent,
    TopListTeamsComponent,
    HomeComponent,
    SocialComponent,
    AboutComponent,
    DescriptionLeagueComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
