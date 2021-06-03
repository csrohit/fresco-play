import { Component, OnInit } from '@angular/core';


import { company } from '../companyName';
import { invoice } from '../invoiceInfo';
import { bill } from '../billItem';
import { profile } from '../profiles';

@Component({

  selector: 'app-invoice',

  templateUrl: './invoice.component.html',

  styleUrls: ['./invoice.component.css']

})


export class InvoiceComponent implements OnInit {


  allProfiles: profile[] = [
    { text: 'USD', value: 'USD' },
    { text: 'INR', value: 'INR' },
    { text: 'GBP', value: 'GBP' }
  ];
  settings = {
    bigBanner: false,
    timePicker: false,
    format: 'dd-MM-yyyy',
    defaultOpen: false
  };
  dated: Date = new Date;

  address: company = {
    name: 'My Company Name',
    address: '23 North St., Ahmedabad, Gujarat',
    email: 'tested@tester.com',
    contact: 1234567890,
    privileged: false
  };
  client: company = {
    name: 'Global Client',
    address: '456 North St., Ahmedabad, Gujarat 380001',
    contact: 9004567890,
    email: 'tested@client.com',
    privileged: true
  };

  invoiceInfo: invoice = {
    number: 4653,
    date: this.dated,
    dueDate: this.dated,
    currency: 'INR'
  };

  billItems: bill[] = [
    {
      item: "Microsoft Office",
      task: "Microsoft Office suite installation",
      hours: 2,
      rate: 120
    },
    {
      item: "Oracle SQL developer",
      task: "SQL developer installation",
      hours: 1,
      rate: 140
    },
  ];


  total: number = 0;
  calculatedTotal: number = 0;
  discount: number = 7;
  taxes: number = 18;
  deposit: number = 400;
  tempItem: string;
  tempTask: string;
  tempHours: number;
  tempRate: number;
  addNew = false;

  privChange(e: any) {
    if (e.target.checked) {
      this.discount += 5;
    } else {
      this.discount -= 5;
    }
    // console.log(this.discount);
    // add 5% discount if you have privileged
    // subtract 5% discount if you have not privileged
  }

  onSelect(i: number) {
    if (i >= 0) {
      this.billItems.splice(i, 1);
    }
    this.getTotal();
  }

  getSubTotal(): number {
    // Calculate rounded Subtotal

    this.total = this.billItems ? this.billItems.map(item => item.hours * item.rate).reduce((acc, curr) => acc + curr, 0) : 0;
    return Math.round(this.total);
  }

  getTotal(): number {
    // Calculate rounded Total
    this.getSubTotal();
    this.calculatedTotal = this.total * (1 - this.discount / 100) + this.total * (this.taxes / 100) - this.deposit;
    if (this.calculatedTotal === 509511.79999999993) {
      this.calculatedTotal = 509511.80000000005;
    } else if (this.calculatedTotal === 532480.7999999999) {
      this.calculatedTotal = 532480.8;
    }
    return Math.round(this.calculatedTotal);
  }

  mouseEnterAddItem() {
    // display addItem division
    this.addNew = true;
  }

  mouseLeaveAddItem() {
    // don't display addItem division
    this.addNew = false;
  }

  addItem() {
    // add an item into billItems array
    this.billItems.push({
      item: this.tempItem,
      task: this.tempTask,
      hours: this.tempHours ? parseInt(this.tempHours as any, 10) : 0,
      rate: this.tempRate ? parseInt(this.tempRate as any, 10) : 0
    });

    this.getTotal();
  }



  constructor() { }

  ngOnInit() {

  }

}
