import { Component, OnInit } from '@angular/core';
import { Driver } from '../models/driver';
import { Ticket } from '../models/ticket';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css'],
})
export class CheckOutComponent implements OnInit {
  driver: Driver;
  ticket: Ticket;
  tickets = [];
  hasTip: boolean = false;
  creditTip: number = 0;
  driverPay: number;
  driverHasCash: number = 0;
  hoursWorked: number;
  wage: number;

  constructor() {}

  ngOnInit() {
    this.driver = JSON.parse(localStorage.getItem('driver'));
    this.hoursWorked = this.driver.hours;
    this.wage = this.driver.pay;
    this.driverPay = this.hoursWorked * this.wage;
    this.tickets = this.getTickets();
    this.calculateValues();
  }

  //To get the tickets found in the driver object
  getTickets() {
    const ticketList = [];
    for (const ticket of this.driver.tickets) {
      ticketList.push({
        id: ticket.id,
        address: ticket.address,
        paymentType: ticket.paymentType,
        total: ticket.total,
        tip: ticket.tip,
      });
    }
    return ticketList;
  }

  //Function used to check if a ticket has a tip
  getDriverTip(ticket: Ticket) {
    if (ticket.tip > 0) {
      return true;
    } else {
      return false;
    }
  }

  //Function used to check if a ticket has a total
  hasTotal(ticket: Ticket) {
    if (ticket.total > 0) {
      return true;
    } else {
      return false;
    }
  }

  //Function to calculate the money values
  calculateValues() {
    for (let i = 0; i < this.tickets.length; i++) {
      this.creditTip += parseFloat(this.tickets[i].tip);
      this.driverHasCash += this.tickets[i].total;
    }
  }
}
