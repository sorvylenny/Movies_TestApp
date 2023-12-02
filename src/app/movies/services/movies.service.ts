import { Injectable } from '@angular/core';
import { Movies } from '../interface/movies';
import { Observable, of } from 'rxjs';
import { Login } from '../interface/login';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
private watchlistKey = 'userWatchlist';
private readonly WATCHLIST_KEY_PREFIX = 'watchlist_';
private movies: Movies[]=[
  {
    id:1,
    title: 'Tenet',
    description:'Armed with only one word, Tenet, and fighting for the survival of the entire world, a protagonist travels through a twilight world of international espionage on a mission that will unfold into something beyond real-time.',
    rating:'7.8',
    duration: '2h 30min',
    genre: 'Action, Science Fiction',
    releaseDate: 'September 3, 2020',
    image: 'Tenet.png',
    trailerLink:'https://www.youtube.com/watch?v=LdOM0x0XDMo'
  },
  {
    id:2,
    title: 'Spider-Man: Into the Spider-Verse',
    description:'Struggling to find his place in the world while juggling school and family, Brooklyn teenager Miles Morales is unexpectedly bitten by a radioactive spider and develops unfathomable powers just like the one and only Spider-Man. While wrestling with the implications of his new abilities, Miles discovers a super collider created by the madman Wilson "Kingpin" Fisk, causing others from across the Spider-Verse to be inadvertently transported to his dimension.',
    rating: '8.4',
    duration: '1h 57min',
    genre:' Action, Animation, Adventure',
    releaseDate: 'December 14, 2018',
    image: 'SpiderMan.png' ,
    trailerLink: 'https://www.youtube.com/watch?v=tg52up16eq0'
  },
  {
    id:3,
    title: 'Knives Out',
    description: 'When renowned crime novelist Harlan Thrombey is found dead at his estate just after his 85th birthday, the inquisitive and debonair Detective Benoit Blanc is mysteriously enlisted to investigate. From Harlan´s dysfunctional family to his devoted staff, Blanc sifts through a web of red herrings and self serving lies to uncover the truth behind Harlan´s untimely death.',
    rating: '7.8',
    duration: '2h 10min',
    genre: 'Comedy, Crime, Drama',
    releaseDate: 'November 27, 2019',
    image: 'KnivesOut.png',
    trailerLink:'https://www.youtube.com/watch?v=qGqiHJTsRkQ'
  },
  {
    id:4,
    title: 'Guardians of the Galaxy',
    description: 'Light years from Earth, 26 years after being abducted, Peter Quill finds himself the prime target of a manhunt after discovering an orb wanted by Ronan the Accuser.',
    rating: '8.0',
    duration: '2h 1min',
    genre:' Action, Adventure, Comedy',
    releaseDate: 'August 1, 2014',
    image:'Guardians_of_The_Galaxy.png',
    trailerLink:'https://www.youtube.com/watch?v=d96cjJhvlMA'
  },
  {
    id:5,
    title: 'Avengers: Age of Ultron',
    description: 'When Tony Stark tries to jumpstart a dormant peacekeeping program, things go awry and Earth’s Mightiest Heroes are put to the ultimate test as the fate of the planet hangs in the balance. As the villainous Ultron emerges, it is up to The Avengers to stop him from enacting his terrible plans, and soon uneasy alliances and unexpected action pave the way for an epic and unique global adventure.',
    rating: '7.3',
    duration: '2h 21min',
    genre:' Action, Adventure, Science Fiction',
    releaseDate: 'May 1, 2015',
    image: 'Avengers.png',
    trailerLink:'https://www.youtube.com/watch?v=tmeOjFno6Do'
  },
  {
    id:6,
    title: 'Iron Man',
    description:' Tony Stark builds a suit and becomes Iron Man after a life-changing experience in Afghanistan. He uses his new abilities to fight against evil forces.',
    rating: '7.6',
    duration: '2h 6min',
    genre: 'Action, Adventure, Sci-Fi',
    releaseDate: 'May 2, 2008',
    image:'IronMan.jpg',
    trailerLink:'https://www.youtube.com/watch?v=8hYlB38asDY'
  },
  {
    id:7,
    title: 'Thor: Ragnarok',
    description: 'Thor finds himself in a lethal gladiatorial contest against the Hulk, his former ally. He must prevent the destruction of his home world and the end of Asgardian civilization.',
    rating: '7.6',
    duration: '2h 10min',
    genre: 'Action, Adventure, Comedy',
    releaseDate: 'November 3, 2017',
    image:'ThorRagnarok.jpg',
    trailerLink:'https://www.youtube.com/watch?v=ue80QwXMRHg'
  },
  {
    id:8,
    title: 'Captain America: The Winter Soldier',
    description: 'Steve Rogers, aka Captain America, teams up with Natasha Romanoff and Sam Wilson to uncover a conspiracy within S.H.I.E.L.D. while facing a mysterious assassin known as the Winter Soldier.',
    rating:'7.7',
    duration: '2h 16min',
    genre: 'Action, Adventure, Sci-Fi',
    releaseDate: 'April 4, 2014',
    image:'CaptainAmerica.jpg',
    trailerLink:'https://www.youtube.com/watch?v=tbayiPxkUMM'
  },
  {
    id:9,
    title: 'Black Panther',
    description: 'T Challa, the heir to the hidden kingdom of Wakanda, must step forward to lead his people into a new future and confront a challenger from his country',
    rating: '7.3',
    duration: '2h 14min',
    genre: 'Action, Adventure, Sci-Fi',
    releaseDate:' February 16, 2018',
    image:'BlackPanther.jpg',
    trailerLink:'https://www.youtube.com/watch?v=xjDjIWPwcPU'
  },
  {
    id:10,
    title: 'Doctor Strange',
    description: 'After a car accident, Dr. Stephen Strange discovers the hidden world of magic and alternate dimensions. He becomes a sorcerer and must protect the world from mystical threats.',
    rating:'7.5',
    duration: '1h 55min',
    genre: 'Action, Adventure, Fantasy',
    releaseDate: 'November 4, 2016',
    image:'DoctorStrange.jpg',
    trailerLink:'https://www.youtube.com/watch?v=HSzx-zryEgM'
  },
  {
    id:11,
    title:'Ant-Man',
    description:' Scott Lang, a master thief, must embrace his inner hero and help his mentor, Dr. Hank Pym, plan and pull off a heist that will save the world.',
    rating: '7.3',
    duration: '1h 57min',
    genre: 'Action, Adventure, Comedy',
    releaseDate: 'July 17, 2015',
    image:'AntMan.jpg',
    trailerLink:'https://www.youtube.com/watch?v=pWdKf3MneyI'
  },
  {
    id:12,
    title: 'The Incredible Hulk',
    description: 'Scientist Bruce Banner scours the planet for an antidote to the unbridled force of rage within him: the Hulk. But when the military masterminds who dream of exploiting his powers force him back to civilization, he finds himself coming face to face with a new, deadly foe.',
    rating: '6.2',
    duration: '1 hr 54 min',
    genre: 'Science, Action, Adventure, Fiction',
    releaseDate: 'June 12, 2008',
    image:'Hulk.jpg',
    trailerLink:'https://www.youtube.com/watch?v=xbqNb2PFKKA'
  }

];
  constructor() { }

  getMovies(): Observable<any[]> {
    return of(this.movies);
  }

  getMovieById(id: number): Observable<any> {
    const movie = this.movies.find((m) => m.id === id);
    return of(movie);
  }

  getMoviesByTitle(): Observable<any[]> {
  const moviesSortedByTitle = this.movies.slice().sort((a, b) => a.title.localeCompare(b.title));
  return of(moviesSortedByTitle);
  }

  getMoviesByreleaseDate(): Observable<any[]> {
   const moviesSortedByreleaseDate = this.movies.slice().sort((a, b) => {
    const dateA = new Date(a.releaseDate);
    const dateB = new Date(b.releaseDate);
    return dateA.getTime() - dateB.getTime();
    });
    return of(moviesSortedByreleaseDate);
  }

  addToWatchlist(movie: any): void {
    let watchlist: any[] = JSON.parse(localStorage.getItem(this.watchlistKey) || '[]');
    watchlist.push(movie);
    localStorage.setItem(this.watchlistKey, JSON.stringify(watchlist));
  }

  getWatchlist(): Observable<any[]> {
    const watchlist: any[] = JSON.parse(localStorage.getItem(this.watchlistKey) || '[]');
    return of(watchlist);
  }
  removeFromWatchlist(movieId: number): void {
    let watchlist: any[] = JSON.parse(localStorage.getItem(this.watchlistKey) || '[]');
    // Filtrar la película que se va a eliminar
    watchlist = watchlist.filter((movie) => movie.id !== movieId);
    localStorage.setItem(this.watchlistKey, JSON.stringify(watchlist));
  }
  private saveWatchlist(watchlist: any[], user: Login): void {
    localStorage.setItem(`${this.WATCHLIST_KEY_PREFIX}${user.id}`, JSON.stringify(watchlist));
  }
}
