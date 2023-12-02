import { Injectable } from '@angular/core';
import { Login } from '../interface/login';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private user: Login[] = [
   {id: 1, userName:'User1', email:'user1@example.com', password:'Abc12345'},
   {id: 2, userName:'User2', email:'user2@example.com', password:'Pass1234'},
  ];
  private readonly userNameKey = 'userName';
  private readonly userId= 'userId';

  constructor() { }
  getUser(): Observable<any[]> {
    return of(this.user);
  }
  setUserNameToStorage(userName: string,id:number): void {
    localStorage.setItem(this.userNameKey, userName);
    localStorage.setItem(this.userId, id.toString());
  }
   getStoredUserName(): string | null {
    return localStorage.getItem(this.userNameKey);
  }

}
