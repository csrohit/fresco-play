import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { DatePipe } from '@angular/common';
import { Appointment } from '../../models/appointment';
import * as alertify from 'alertify.js';

@Component({
  selector: 'app-view-patient',
  templateUrl: './view-patient.component.html',
  styleUrls: ['./view-patient.component.css'],
  providers: [DatePipe]
})
export class ViewPatientComponent implements OnInit {

  patient;
  listOfDiseases;
  today;
  isBookAppointment: boolean = true;
  isFormEnabled: boolean = false;
  isScheduledAppointment: boolean = true;
  isTableEnabled: boolean = false;
  appointmentForm: FormGroup;
  appointmentDetails = new Appointment;
  bookedAppointmentResponse;
  ScheduledAppointmentResponse;

  constructor(fb: FormBuilder,private route: Router, private datePipe: DatePipe, private activatedRoute: ActivatedRoute, private dataService: DataService) {
    this.today = this.datePipe.transform(Date.now(), 'yyyy-MM-dd');


    // add necessary validators
    this.appointmentForm = fb.group({
      'selectDisease' : [null],
      'tentativeDate' : [null],
      'priority' : [null]
    })

   }

  ngOnInit() {

    // get selected patient id
    // get Particular Patient from service using patient id and assign response to patient property

  }

  bookAppointment() {
    // get diseases list from service

    // change isBookAppointment, isScheduledAppointment, isFormEnabled, isTableEnabled property values appropriately
  }

  scheduleAppointment() {

    // The below attributes to be added while booking appointment using service
    // patientId, fname, lname, disease, priority, tentativedate, registeredTime

    // if booked successfully should redirect to 'requested_appointments' page
    
  }

  scheduledAppointment() {

    // change isBookAppointment, isScheduledAppointment, isFormEnabled, isTableEnabled property values appropriately

    // get particular patient appointments using getSinglePatientAppointments method of DataService 

  }

  cancelAppointment(appointmentId) {
    // delete selected appointment uing service

    // After deleting the appointment, get particular patient appointments

  }
  
}
