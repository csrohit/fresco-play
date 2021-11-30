import { Component, OnInit, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Users } from '../../models/users';
import { DataService } from '../../services/data.service';
// import * as alertify from 'alertify.js';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {

  // used as a flag to display or hide form
  editProfile = false;
  userDetails;
  updateMyDetails : any = {};
  editProfileForm: FormGroup;
  userImg = './../../assets/user.jpg';
  mobileErrMsg = 'You must enter a valid mobile number';
  emailErrMsg = 'You must enter a valid Email ID';
  locationErrMsg = 'You must enter the location';
  constructor(private dataService: DataService) {

  }

  ngOnInit() {

    // add necessary validators
    // username should be disabled. it should not be edited

    this.editProfileForm = new FormGroup({
      userName: new FormControl('', Validators.required),
      mobile: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]),
      email: new FormControl('', [Validators.required, Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]),
      location: new FormControl('', Validators.required)
    });

    this.editProfileForm.get('userName').disable();
    // get profile details and display it
    this.getProfileDetails();

  }

  getProfileDetails() {

    // retrieve user details from service using userId
    this.dataService.getUserDetails()
    .subscribe(res => {
      this.userDetails = res;
    }, err => {

    });

  }

  changeMyProfile() {

    // if successfully changed the profile it should display new details hiding the form
    this.dataService.updateProfile(this.userDetails.id, this.editProfileForm.value)
    .subscribe(res => {
      if(res) {
        this.discardEdit();
      this.getProfileDetails();
      }
    }, err => {

    })
  }

  editMyProfile() {

    // change editProfile property value appropriately
    this.editProfile = true;
    this.editProfileForm.patchValue({
      userName: this.userDetails.user_name,
      email: this.userDetails.user_email,
      mobile: this.userDetails.user_mobile,
      location: this.userDetails.location
    })
  }

  discardEdit() {

    // change editProfile property value appropriately
    this.editProfile = false;
  }

}
