import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { VideoComponent } from '../Models/video/video.component';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Movies } from '../interface/movies';
;

@Component({
  selector: 'app-details-movies',
  templateUrl: './details-movies.component.html',
  styleUrls: ['./details-movies.component.css']
})
export class DetailsMoviesComponent  implements OnInit{
  movieId: number | undefined;
  movieDetails: any;
  watchlist: any[] = [];
  displayedColumns: string[] = ['position', 'title', 'genre', 'releaseDate', 'action'];
  constructor(private dialog: MatDialog,
     private route: ActivatedRoute,
     private moviesService: MoviesService,
     private router: Router,
     private snackBar: MatSnackBar,
     private sanitizer: DomSanitizer ) { }
  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.moviesService.getMovieById(Number(params.get('id')))
      )
    ).subscribe((movie) => {
      /* this.movieDetails = movie; */
      this.movieDetails = { ...movie, TrailerLink: this.sanitizer.bypassSecurityTrustResourceUrl(movie.TrailerLink) as SafeResourceUrl};
      this.getWatchlist();
    });
  }
  getWatchlist(): void {
    this.moviesService.getWatchlist().subscribe(watchlist => {
      this.watchlist = watchlist.map(movie => ({ ...movie, selected: false }));
    });
  }
  addToWatchlist(movie: Movies): void {
    const index = this.watchlist.findIndex(item => item.title === movie.title);

    if (index !== -1) {
      this.watchlist[index].selected = !this.watchlist[index].selected;
      console.log('Toggling selection. New state:', this.watchlist[index].selected);
    } else {
      this.moviesService.addToWatchlist({ ...movie, selected: true });
    }

    this.getWatchlist();
  }


  removeFromWatchlist(movie: any): void {
    this.moviesService.removeFromWatchlist(movie.id);
    this.snackBar.open('Removed from watchlist', 'Close', { duration: 2000 });
    this.getWatchlist();
    this.watchlist = [...this.watchlist];
  }

  goToback(): void {
    this.router.navigate(['/listMovies']);
  }
   openVideoDialog(TrailerLink: string): void {
    console.log(TrailerLink)
    this.dialog.open(VideoComponent, {
      data:{ TrailerLink },
      width: '950px',
      height: '600px'
    });
  }
}
