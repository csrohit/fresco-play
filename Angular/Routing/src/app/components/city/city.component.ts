import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/app/services/contact.service';
import { Contact, Contacts } from 'src/app/models/contacts';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {

  contacts: Contact[] = [];
  constructor(
    private contactService: ContactService
  ) { }

  ngOnInit() {
    // call your service and assign response to contacts
    this.contactService.getContacts().subscribe(res =>{
      this.contacts = res.contactsList;
    })
  }

}
