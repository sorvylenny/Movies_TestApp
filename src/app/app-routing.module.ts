import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './movies/login/login.component';
import { ListMoviesComponent } from './movies/list-movies/list-movies.component';
import { DetailsMoviesComponent } from './movies/details-movies/details-movies.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: 'listMovies', component: ListMoviesComponent },
  { path: 'detailsMovies/:id', component: DetailsMoviesComponent },
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
