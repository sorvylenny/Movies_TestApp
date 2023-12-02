import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Movies } from '../../interface/movies';
import { MoviesService } from '../../services/movies.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css'],
})
export class VideoComponent implements OnInit {
  movies: Movies[] = [];
  video: any = 'tg52up16eq0';
  url: string = '';

  constructor(
    private moviesService: MoviesService,
    private _sanitizer: DomSanitizer,
    public dialogRef: MatDialogRef<VideoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    // Obtener la URL de data

    this.url = this.data.TrailerLink.changingThisBreaksApplicationSecurity;
  }
  getVideoIframe(url: string) {
    var video, results;

    if (this.url === null) {
      return '';
    }
    results = this.url.match('[\\?&]v=([^&#]*)');
    video = results === null ? this.url : results[1];

    return this._sanitizer.bypassSecurityTrustResourceUrl(
      'https://www.youtube.com/embed/' + video 
    );
  }

  onClose(): void {
    this.dialogRef.close();
  }
}

/*     */
