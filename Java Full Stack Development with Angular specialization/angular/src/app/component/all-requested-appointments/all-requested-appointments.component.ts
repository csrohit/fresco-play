import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';
import { Appointment } from '../../models/appointment';

@Component({
  selector: 'app-all-requested-appointments',
  templateUrl: './all-requested-appointments.component.html',
  styleUrls: ['./all-requested-appointments.component.css']
})
export class AllRequestedAppointmentsComponent implements OnInit {

  allAppointments: Appointment[] = [];

  constructor(private dataService: DataService, private route: Router) {
  }

  ngOnInit() {
    // call appointments method by default
    this.appointments();
  }

  appointments() {

    // get all requested appointments from service
    this.dataService.requestedAppointments().subscribe(data => {
      this.allAppointments = data;
    })
  }

  view(patientId) {

    // should navigate to 'patientList' page with selected patientId
    // this.route.navigate(['patientlist', patientId]);
    this.route.navigate(['patientList', patientId]);

  }

  cancelAppointment(id) {

    // delete selected appointment uing service
    this.dataService.deleteAppointment(id).subscribe(data => {
      console.log(data);
      this.appointments();
    });
    // After deleting the appointment, get all requested appointments


  }

}
