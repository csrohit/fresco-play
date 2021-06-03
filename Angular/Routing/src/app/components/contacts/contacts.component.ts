import { Component, OnInit } from '@angular/core';
import {  ContactService } from '../../services/contact.service';
import { Contacts, Contact } from 'src/app/models/contacts';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  contacts: Contact[];
  constructor(
    private contactService: ContactService
  ) { }

  ngOnInit() {
    // call your service and assign response to contacts
    this.contactService.getContacts().subscribe(res => {
      this.contacts = res.contactsList;
    });
  }

}
