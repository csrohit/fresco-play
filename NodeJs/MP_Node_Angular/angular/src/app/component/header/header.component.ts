import { Component, OnInit, DoCheck, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {DataService } from '../../services/data.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userDetails: any = {};
  
  constructor(private dataService: DataService) { 

  }

  ngOnInit() {

    // call getProfileDetails method to get user details

  }

  getProfileDetails() {

  // call getUserDetails method of dataService and assign response to userDetails property

  }

  logout() {

    // call doLogOut method
    
  }
}
