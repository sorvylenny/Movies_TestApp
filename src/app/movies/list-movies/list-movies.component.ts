import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Router } from '@angular/router';
import { Movies } from '../interface/movies';

@Component({
  selector: 'app-list-movies',
  templateUrl: './list-movies.component.html',
  styleUrls: ['./list-movies.component.css'],
})
export class ListMoviesComponent implements OnInit {
  movies: any[] = [];
  sortBy: 'title' | 'releaseDate' = 'title';
  email: string | null = '';
  watchlist: any[] = [];

  constructor(private moviesService: MoviesService, private router: Router) {}
  ngOnInit(): void {
    this.getMovies();
    if (this.movies.length > 0) {
      this.checkIfInWatchlist(this.movies[0]);
    }
  }
  getMovies(): void {
    if (this.sortBy === 'title') {
      this.moviesService.getMoviesByTitle().subscribe((movies) => {
        this.movies = movies;
      });
    } else if (this.sortBy === 'releaseDate') {
      this.moviesService.getMoviesByreleaseDate().subscribe((movies) => {
        this.movies = movies;
      });
    }
  }
  calculateCircleRadius(): number {
    const screenSize = window.innerWidth;
    return screenSize >= 1440 && screenSize <= 2560
      ? 40
      : screenSize >= 768
      ? 20
      : screenSize >= 375
      ? 15
      : 10;
  }

  calculateUnitsFontSize(): string {
    const screenSize = window.innerWidth;
    return screenSize >= 1440 && screenSize <= 2560
      ? '40'
      : screenSize >= 768
      ? '20'
      : screenSize >= 375
      ? '15'
      : '10';
  }

  calculateTitleFontSize(): string {
    const screenSize = window.innerWidth;
    return screenSize >= 1440 && screenSize <= 2560
      ? '40'
      : screenSize >= 768
      ? '20'
      : screenSize >= 375
      ? '15'
      : '10';
  }


  addToWatchlist(movie: Movies): void {
    const userId = localStorage.getItem('userId');

    if (!userId) {
      console.error('userId no encontrado en el localStorage.');
      return;
    }

    const userWatchlistKey = `watchlist_${userId}`;
    if (!localStorage.getItem(userWatchlistKey)) {
      localStorage.setItem(userWatchlistKey, JSON.stringify([]));
    }

    const userWatchlist: Movies[] = JSON.parse(
      localStorage.getItem(userWatchlistKey) || '[]'
    );

    const index = userWatchlist.findIndex((item) => item.title === movie.title);

    if (index !== -1) {
      userWatchlist[index].selected = !userWatchlist[index].selected;
    } else {
      userWatchlist.push({ ...movie, selected: true });
    }

    localStorage.setItem(userWatchlistKey, JSON.stringify(userWatchlist));
    this.checkIfInWatchlist(movie);
  }

  isInWatchlist(movie: Movies): boolean {
    return this.watchlist.some(
      (item) => item.title === movie.title && item.selected
    );
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
  checkIfInWatchlist(movie: Movies): boolean {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      console.error('userId no encontrado en el localStorage.');
      return false;
    }

    const userWatchlistKey = `watchlist_${userId}`;
    const watchlist: Movies[] = JSON.parse(localStorage.getItem(userWatchlistKey) || '[]');

    // Verifica si la película actual está en la watchlist
    return watchlist.some(item => item.title === movie.title && item.selected);
  }

}
