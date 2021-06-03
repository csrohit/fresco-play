import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { Router } from '@angular/router';
import { Member } from '../../models/member';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  allMembers: Member[];

  constructor(private service: ApiService, private route: Router) {
    this.service.clearFormValue();
  }

  ngOnInit() {
    this.getMembers();
  }

  getMembers() {
    this.service.getMembers()
      .subscribe(response => {
        this.allMembers = response;
      });
  }

  addNewMember() {
    this.route.navigate(['/reg']);
  }

  edit(item, i) {
    this.service.setFormValue(item);
    this.route.navigate(['/reg']);
  }

  delete(id, i) {
    this.service.deleteMember(id)
      .subscribe(response => {
        this.getMembers();
      });
  }
}
