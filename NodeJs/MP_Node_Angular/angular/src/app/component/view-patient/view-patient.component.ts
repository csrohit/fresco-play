import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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

  constructor(fb: FormBuilder,
    private route: Router,
    private datePipe: DatePipe,
    private activatedRoute: ActivatedRoute,
    private dataService: DataService) {
    this.today = this.datePipe.transform(Date.now(), 'yyyy-MM-dd');


    // add necessary validators
    this.appointmentForm = fb.group({
      'selectDisease': [null],
      'tentativeDate': [null],
      'priority': [null]
    })

  }

  ngOnInit() {

    // get selected patient id
    // get Particular Patient from service using patient id and assign response to patient property
    this.activatedRoute
      .params
      .switchMap(params => {
        return this.dataService.getParticularPatient(params.id)
      }).subscribe(res => {
        this.patient = res;
      })


  }

  bookAppointment() {
    // get diseases list from service
    this.dataService.diseasesList().subscribe(res => {
      this.listOfDiseases = res;
    })
    // change isBookAppointment, isScheduledAppointment, isFormEnabled, isTableEnabled property values appropriately
    this.isBookAppointment = false;
    this.isFormEnabled = true;
    this.isTableEnabled = false;
  }

  scheduleAppointment() {

    // The below attributes to be added while booking appointment using service
    // patientId, fname, lname, disease, priority, tentativedate, registeredTime

    // if booked successfully should redirect to 'requested_appointments' page

    const apt = {
      disease: this.appointmentForm.value.selectDisease,
      priority: this.appointmentForm.value.priority,
      tentativeDate: this.appointmentForm.value.tentativeDate,
      patientId: this.patient.userId,
      fname: this.patient.fname,
      lname: this.patient.lname,
      registeredTime: this.appointmentForm.value.tentativeDate
    };
    this.dataService.scheduleAppointment(apt)
      .subscribe(res => {
        if (res) {
          this.route.navigate(['requested_appointments']);
        }
      }, err => {

      })

  }

  scheduledAppointment() {

    // change isBookAppointment, isScheduledAppointment, isFormEnabled, isTableEnabled property values appropriately
    this.isScheduledAppointment = false;
    this.isBookAppointment = true;
    this.isFormEnabled = false;
    this.isTableEnabled = true;

    // get particular patient appointments using getSinglePatientAppointments method of DataService 
    this.getAppointments();
  }

  cancelAppointment(appointmentId) {
    // delete selected appointment uing service

    // After deleting the appointment, get particular patient appointments
    this.dataService.deleteAppointment(appointmentId)
      .subscribe(res => {
        if (res) {
          this.getAppointments();
        } else {

        }
      }, err => {

      })

  }

  getAppointments() {
    this.dataService.getSinglePatientAppointments(this.patient._id)
      .subscribe(res => {
        if (res) {
          this.ScheduledAppointmentResponse = res;
        }
      });
  }

}
