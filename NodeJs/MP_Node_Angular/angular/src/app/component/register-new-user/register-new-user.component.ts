import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { Observable } from 'rxjs/Observable';
import * as alertify from 'alertify.js';
import { Users } from '../../models/users';

@Component({
  selector: 'app-register-new-user',
  templateUrl: './register-new-user.component.html',
  styleUrls: ['./register-new-user.component.css']
})

export class RegisterNewUserComponent implements OnInit {

	regNewUser = new Users;
	signupForm: FormGroup;

  emptyUserName = 'You must enter a username';
  minlengthUserName = 'User name must be at least 3 characters long';
  maxlengthUserName = 'Username cannot exceed 20 characters';
  userNamePattern = 'Username should be in alphanumeric only';

  emptyPassword = 'You must enter a password';
  minlengthPassword = 'Password must be at least 8 characters long';
  maxlengthPassword = 'Password cannot exceed 20 characters';
  passwordPattern = 'Pattern does not match';

  mobileErrMsg = 'You must enter a valid mobile number';
  emailErrMsg = 'You must enter a valid Email ID';
  locationErrMsg = 'You must enter the location';

  constructor(private route: Router, private dataService: DataService) {
   }

  ngOnInit() {

    // add necessary validators

  	this.signupForm = new FormGroup({
  		userName: new FormControl(''),
  		password: new FormControl(''),
      mobile: new FormControl(''),
      email: new FormControl(''),
      location: new FormControl('')
  	});
  }

  signUp() {

    // call regNewUser method to perform signup operation
    // if success, redirect to login page
    // else display appropriate error message
       // reset the form
    
  }

  goBack() {

    // should navigate to login page

  }

}
