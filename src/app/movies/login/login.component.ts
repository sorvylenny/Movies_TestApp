import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from '../interface/login';
import { LoginService } from '../services/login.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  formLogin: FormGroup;
  hidePassword: boolean = true;
  showLoading: boolean = false;
  users: any[]=[];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loginService: LoginService
  ) {
    // Initialize the login form with email and password fields
    this.formLogin = this.fb.group({
      email: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  // Toggle password visibility
  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  // Fetch users data
  getUsers(): void {
    this.loginService.getUser().subscribe(users => {
      this.users = users;
    });
  }

  // Initialize user login session
  initSesion() {
    this.showLoading = true;

    // Create a login request object with email and password
    const request: Login = {
      email: this.formLogin.value.email,
      password: this.formLogin.value.password
    };

    this.loginService.getUser().subscribe(users => {
      // Find the user in the list with matching email and password
      const loggedInUser = users.find(user => user.email === request.email && user.password === request.password);

      if (loggedInUser) {
        // If user is found, set user name to local storage, show success message, and navigate to the movie list page
        const loggedUser = loggedInUser;
        this.loginService.setUserNameToStorage(loggedUser.userName,loggedUser.id);

        Swal.fire({
          icon: 'success',
          title: 'Login successful',
          text: `Welcome, ${loggedInUser.email}!`,
        });

        this.router.navigate(['/listMovies']);
      } else {
        // If no user found, show error message
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Incorrect credentials',
        });
      }
    });
  }


}
