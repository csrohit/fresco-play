import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { Patient } from '../../models/patient';
import { DataService } from '../../services/data.service';
// import * as alertify from 'alertify.js';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  providers: [DatePipe]
})
export class FormComponent implements OnInit {

  complexForm: FormGroup;
  patientDetails = new Patient;
  result;

  today: string;

  noRecordsFound = 'No patient records found in the list. Click on Register New Patient to add Patient details.';

  emptyName = 'You must include a name.';
  minlengthName = 'Your name must be at least 3 characters long.';
  maxlengthName = 'Your name cannot exceed 20 characters.';
  noGender = 'You must select a gender.';
  noDob = 'You must select a valid date of birth.';
  noMobile = 'You must include mobile number.';
  numberMobile = 'You must enter a valid 10 digit mobile number.';
  maxlengthMobile = 'Your mobile number should not exceed 10 digits.';
  patternEmail = 'You must enter a valid Email ID.';

  ngOnInit() {
    this.today = this.datePipe.transform(Date.now(), 'yyyy-MM-dd');
  }

  constructor(fb: FormBuilder, private datePipe: DatePipe, private route: Router, private dataService: DataService) {
    // add necessary validators
    this.complexForm = fb.group({
      'name': ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      'gender': [null, Validators.required],
      'dob': [null, Validators.required],
      'mobile': ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10), Validators.pattern(/^[0-9]{10,}/)]],
      'email': ['', [Validators.required, Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]],
    })
  }

  submitForm(val: any) {

    // should reister new patient using service
    // fields that need to be added: patient_name, patient_gender, patient_dob, patient_mobile, patient_email
    // if added successfully should redirect to 'patientList' page

    this.dataService.registerPatient({
      patient_name: val.name,
      patient_gender: val.gender,
      patient_dob: val.dob,
      patient_mobile: val.mobile,
      patient_email: val.email
    }).subscribe(res => {
      this.route.navigate(['patientList'])
    }, err => {

    })
  }

}
