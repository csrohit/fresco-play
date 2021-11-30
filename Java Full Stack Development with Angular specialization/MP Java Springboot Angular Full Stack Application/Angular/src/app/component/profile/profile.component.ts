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
      userName: new FormControl(''),
      mobile: new FormControl(''),
      email: new FormControl(''),
      location: new FormControl('')
    });

    // get profile details and display it

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
    const id = localStorage.getItem("id");
    // if successfully changed the profile it should display new details hiding the form
    this.dataService.updateProfile(id, this.editProfileForm.value)
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
    this.editProfileForm.patchValue(this.userDetails);

  }

  discardEdit() {

    // change editProfile property value appropriately
    this.editProfile = false;

  }
}
