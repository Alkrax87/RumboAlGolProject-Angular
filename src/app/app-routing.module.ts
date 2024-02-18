import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Liga1MainComponent } from './components/liga1/liga1-main/liga1-main.component';
import { Liga1EquiposComponent } from './components/liga1/liga1-equipos/liga1-equipos.component';
import { Liga1FixtureComponent } from './components/liga1/liga1-fixture/liga1-fixture.component';
import { Liga1TablaComponent } from './components/liga1/liga1-tabla/liga1-tabla.component';
import { Liga1TecnicosComponent } from './components/liga1/liga1-tecnicos/liga1-tecnicos.component';
import { Liga2MainComponent } from './components/liga2/liga2-main/liga2-main.component';
import { Liga2EquiposComponent } from './components/liga2/liga2-equipos/liga2-equipos.component';
import { Liga2FixtureComponent } from './components/liga2/liga2-fixture/liga2-fixture.component';
import { Liga2TablaComponent } from './components/liga2/liga2-tabla/liga2-tabla.component';
import { Liga2TecnicosComponent } from './components/liga2/liga2-tecnicos/liga2-tecnicos.component';
import { CopaPeruMainComponent } from './components/copa-peru/copa-peru-main/copa-peru-main.component';
import { CopaPeruEquiposComponent } from './components/copa-peru/copa-peru-equipos/copa-peru-equipos.component';
import { CopaPeruTablaComponent } from './components/copa-peru/copa-peru-tabla/copa-peru-tabla.component';
import { EliminatoriasMainComponent } from './components/eliminatorias/eliminatorias-main/eliminatorias-main.component';
import { EliminatoriasEquiposComponent } from './components/eliminatorias/eliminatorias-equipos/eliminatorias-equipos.component';
import { EliminatoriasFixtureComponent } from './components/eliminatorias/eliminatorias-fixture/eliminatorias-fixture.component';
import { EliminatoriasTablaComponent } from './components/eliminatorias/eliminatorias-tabla/eliminatorias-tabla.component';
import { EliminatoriasTecnicosComponent } from './components/eliminatorias/eliminatorias-tecnicos/eliminatorias-tecnicos.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'path' },
  { path:'liga1', component: Liga1MainComponent, children:[
    { path: 'equipos', component: Liga1EquiposComponent },
    { path: 'fixture', component: Liga1FixtureComponent },
    { path: 'tabla', component: Liga1TablaComponent },
    { path: 'tecnicos', component: Liga1TecnicosComponent },
  ]},
  { path: 'liga2', component: Liga2MainComponent, children: [
    { path: 'equipos', component: Liga2EquiposComponent },
    { path: 'fixture', component: Liga2FixtureComponent },
    { path: 'tabla', component: Liga2TablaComponent },
    { path: 'tecnicos', component: Liga2TecnicosComponent }
  ]},
  { path: 'copa-peru', component: CopaPeruMainComponent, children: [
    { path: 'equipos', component: CopaPeruEquiposComponent },
    { path: 'tabla', component: CopaPeruTablaComponent },
  ]},
  { path: 'eliminatorias', component: EliminatoriasMainComponent, children: [
    { path: 'equipos', component: EliminatoriasEquiposComponent },
    { path: 'fixture', component: EliminatoriasFixtureComponent },
    { path: 'tabla', component: EliminatoriasTablaComponent },
    { path: 'tecnicos', component: EliminatoriasTecnicosComponent }
  ]},
  //{ path: '**', component: PathNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
