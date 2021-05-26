import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';
import * as alertify from 'alertify.js';

@Component({
  selector: 'app-all-requested-appointments',
  templateUrl: './all-requested-appointments.component.html',
  styleUrls: ['./all-requested-appointments.component.css']
})
export class AllRequestedAppointmentsComponent implements OnInit {

	allAppointments;

  constructor(private dataService: DataService, private route: Router) { 
  }

  ngOnInit() {
    // call appointments method by default
  }

  appointments() {

    // get all requested appointments from service

  }

  view(patientId) {

    // should navigate to 'patientList' page with selected patientId

  }

  cancelAppointment(id) {

    // delete selected appointment uing service

    // After deleting the appointment, get all requested appointments


  }

}
