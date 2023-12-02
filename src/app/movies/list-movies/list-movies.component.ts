import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Router } from '@angular/router';
import { Movies } from '../interface/movies';

@Component({
  selector: 'app-list-movies',
  templateUrl: './list-movies.component.html',
  styleUrls: ['./list-movies.component.css']
})
export class ListMoviesComponent implements OnInit {
  movies: any[] = [];
  sortBy: 'title' | 'releaseDate' = 'title';
  email: string | null='';
  watchlist: any[] = [];

  constructor(private moviesService: MoviesService,  private router: Router,) {}
  ngOnInit(): void {
    this.getMovies();
  }
  getMovies(): void {
    if (this.sortBy === 'title') {
      this.moviesService.getMoviesByTitle().subscribe(movies => {
        this.movies = movies;
      });
    } else if (this.sortBy === 'releaseDate') {
      this.moviesService.getMoviesByreleaseDate().subscribe(movies => {
        this.movies = movies;
      });
    }
  }
  calculateCircleRadius(): number {
    const screenSize = window.innerWidth;
    return screenSize >= 1440 && screenSize <= 2560 ? 40 :
           screenSize >= 768 ? 20 :
           screenSize >= 375 ? 15 : 10;
  }


  calculateUnitsFontSize(): string {
    const screenSize = window.innerWidth;
    return screenSize >= 1440 && screenSize <= 2560 ? '40' :
           screenSize >= 768 ? '20' :
           screenSize >= 375 ? '15' : '10';
  }

  calculateTitleFontSize(): string {
    const screenSize = window.innerWidth;
    return screenSize >= 1440 && screenSize <= 2560 ? '40' :
           screenSize >= 768 ? '20' :
           screenSize >= 375 ? '15' : '10';
  }


  getWatchlist(): void {
    this.moviesService.getWatchlist().subscribe(watchlist => {
      this.watchlist = watchlist.map(movie => ({ ...movie, selected: false }));
    });
  }
  isInWatchlist(movie: Movies): boolean {
    return this.watchlist.some(item => item.title === movie.title && item.selected);
  }
  addToWatchlist(movie: Movies): void {
    const index = this.watchlist.findIndex(item => item.title === movie.title);

    if (index !== -1) {
      this.watchlist[index].selected = !this.watchlist[index].selected;
    } else {
      this.moviesService.addToWatchlist({ ...movie, selected: true });
    }

    // Obtén el id de la película si es necesario para navegar a los detalles
    const movieId = movie.id;

    // Actualiza la lista de seguimiento
    this.getWatchlist();

    // Navega a los detalles de la película
    this.router.navigate(['/detailsMovies', movieId]);
  }
  sortByTitle(): void {
    this.sortBy = 'title';
    this.getMovies();
  }

  sortByReleaseDate(): void {
    this.sortBy = 'releaseDate';
    this.getMovies();
  }


  goToDetails(movieId: number): void {
    this.router.navigate(['/detailsMovies', movieId]);
  }

}
