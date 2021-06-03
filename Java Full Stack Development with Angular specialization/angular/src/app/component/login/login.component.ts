import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoggedIn: boolean = false;
  loginForm: FormGroup;
  isLoginFailed: boolean = false;


  emptyUserName = 'You must enter a username';
  minlengthUserName = 'User name must be at least 3 characters long';
  maxlengthUserName = 'Username cannot exceed 20 characters';
  userNamePattern = 'Username should be in alphanumeric only';
  emptyPassword = 'You must enter a password';
  minlengthPassword = 'Password must be at least 8 characters long';
  maxlengthPassword = 'Password cannot exceed 20 characters';
  passwordPattern = 'Pattern does not match';
  wrongCredentials = 'Incorrect Username or Password';

  constructor(private route: Router, private dataService: DataService) {
  }

  ngOnInit() {

    // add necessary validators

    this.loginForm = new FormGroup({
      userName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.pattern(/^[a-zA-Z0-9]*$/)
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20),
        Validators.pattern(/^[a-zA-Z0-9!$%@#*?&£€]*$/)
      ])
    });
  }

  doLogin() {
    // call authenticateUser method to perform login operation
    this.dataService.authenticateUser(this.loginForm.get('userName').value, this.loginForm.get('password').value)
      .subscribe(data => {
        if (data) {
          // if success, redirect to profile page
          this.route.navigate(['/profile']);
        } else {
          // else display appropriate error message
          this.isLoginFailed = true;
          // reset the form
          this.loginForm.reset();
        }
      }, err => {
        this.isLoginFailed = true;
        console.log(err);
      });
  }
}



