import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Users } from '../../models/users.model';
import { DataService } from '../../services/data.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {

  // used as a flag to display or hide form
  editProfile = false;
  userId = -1;
  private userDetails = new Users;

  editProfileForm: FormGroup;
  userImg = './../../assets/user.jpg';
  mobileErrMsg = 'You must enter a valid mobile number';
  emailErrMsg = 'You must enter a valid Email ID';
  locationErrMsg = 'You must enter the location';

  constructor(private dataService: DataService) { }

  ngOnInit() {

    // add necessary validators
    // username should be disabled. it should not be edited

    this.editProfileForm = new FormGroup({
      userName: new FormControl({ value: ''}),
      mobile: new FormControl(''),
      email: new FormControl(''),
      location: new FormControl('')
    });

    // get login status from service
    // get userId from service and assign it to userId property
    // get profile details and display it

  }

  changeMyProfile() {

    // if successfully changed the profile it should display new details hiding the form

  }

  editMyProfile() {

    // change editProfile property value appropriately

  }

  discardEdit() {

    // change editProfile property value appropriately

  }

  getProfileDetails() {

    // retrieve user details from service using userId

  }
  
}
