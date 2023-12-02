import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { VideoComponent } from '../Models/video/video.component';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Movies } from '../interface/movies';
@Component({
  selector: 'app-details-movies',
  templateUrl: './details-movies.component.html',
  styleUrls: ['./details-movies.component.css'],
})
export class DetailsMoviesComponent implements OnInit {
  movieId: number | undefined;
  movieDetails: any;
  watchlist: any[] = [];
  displayedColumns: string[] = [
    'position',
    'title',
    'genre',
    'releaseDate',
    'action',
  ];
  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private moviesService: MoviesService,
    private router: Router,
    private snackBar: MatSnackBar,
    private sanitizer: DomSanitizer
  ) {}
  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) =>
          this.moviesService.getMovieById(Number(params.get('id')))
        )
      )
      .subscribe((movie) => {
        this.movieDetails = { ...movie, TrailerLink: movie.trailerLink };
        this.getWatchlist();
      });
      this.checkIfInWatchlist();
  }

  getWatchlist(): void {
    const userId = localStorage.getItem('userId');

    if (!userId) {
      console.error('userId no encontrado en el localStorage.');
      return;
    }

    const userWatchlistKey = `watchlist_${userId}`;

    this.moviesService
      .getWatchlist(userWatchlistKey)
      .subscribe((userWatchlist) => {
        this.watchlist = userWatchlist.map((movie) => ({
          ...movie,
          selected: false,
        }));
      });
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
    this.getWatchlist();
    this.checkIfInWatchlist();
  }

  removeFromWatchlist(movie: any): void {
    const userId = localStorage.getItem('userId');
    const userWatchlistKey = `watchlist_${userId}`;
    let watchlist: any[] = JSON.parse(
      localStorage.getItem(userWatchlistKey) || '[]'
    );
    watchlist = watchlist.filter((item) => item.id !== movie.id);
    localStorage.setItem(userWatchlistKey, JSON.stringify(watchlist));
    this.snackBar.open('Removed from watchlist', 'Close', { duration: 2000 });
    this.getWatchlist();
    this.checkIfInWatchlist();
  }

  goToback(): void {
    this.router.navigate(['/listMovies']);
  }
  openVideoDialog(TrailerLink: string): void {
    this.dialog.open(VideoComponent, {
      data: { TrailerLink },
      width: '950px',
      height: '600px',
    });
  }

  checkIfInWatchlist(): void {
    const userId = localStorage.getItem('userId');
    const userWatchlistKey = `watchlist_${userId}`;
    const watchlist: any[] = JSON.parse(localStorage.getItem(userWatchlistKey) || '[]');

    // Verifica si la película actual está en la watchlist
    const isInWatchlist = watchlist.some(item => item.id === this.movieDetails.id);

    // Establece movieDetails.selected en consecuencia
    this.movieDetails.selected = isInWatchlist;

  }
}
