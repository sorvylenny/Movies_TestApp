import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userName: string | null = null;
  constructor(private router: Router, private loginService: LoginService) {}
  ngOnInit(): void {
    this.userName = this.loginService.getStoredUserName();
  }
  logout(){
    localStorage.removeItem('userName');
    this.router.navigate(['/login']);
  }
  listMovies(){
    this.router.navigate(['/listMovies']);
  }

}
