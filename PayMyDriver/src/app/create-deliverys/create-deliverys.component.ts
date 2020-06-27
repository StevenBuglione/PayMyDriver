import {
  faCoffee,
  faPlusCircle,
  faMapMarkerAlt,
  faMoneyBillWaveAlt,
  faWallet,
} from '@fortawesome/free-solid-svg-icons';
import { DriverService } from './../_services/driver.service';
import { Driver } from './../models/driver';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { TicketModalComponent } from '../ticket-modal/ticket-modal.component';
import { stringify } from 'querystring';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Ticket } from '../models/ticket';

@Component({
  selector: 'app-create-deliverys',
  templateUrl: './create-deliverys.component.html',
  styleUrls: ['./create-deliverys.component.css'],
})
export class CreateDeliverysComponent implements OnInit {
  driver: Driver;
  modalRef: BsModalRef;
  faPlus = faPlusCircle;
  hasNewTicket: boolean;
  tickets = [];
  count: number;
  ///////////////////
  title: string;
  closeBtnName: string;
  list: any[] = [];
  ticketForm: FormGroup;
  ticket: Ticket;
  faMap = faMapMarkerAlt;
  faMoney = faMoneyBillWaveAlt;
  faWallet = faWallet;
  hasTip: boolean = false;

  constructor(private modalService: BsModalService, private fb: FormBuilder) {}

  ngOnInit() {
    this.driver = JSON.parse(localStorage.getItem('driver'));
    this.createTicketForm();
    this.tickets = this.getTickets();
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

  //Opens the Ticket Creation form
  openTicketForm(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  //Creates the Ticket Form for reative form
  createTicketForm() {
    this.ticketForm = this.fb.group({
      paymentType: ['', Validators.required],
      address: [''],
      total: [''],
      tip: [''],
    });
  }

  //This function is callled on the submition of the "Ticket Form"
  createTicket() {
    if (this.ticketForm.valid) {
      this.ticket = Object.assign({}, this.ticketForm.value);
      this.driver.tickets.push(this.ticket);
      localStorage.setItem('driver', JSON.stringify(this.driver));
    }
    this.ngOnInit();
  }

  //Function to set a cash transation for "Ticket Form"
  cashTransaction() {
    this.hasTip = false;
  }

  //Function to set a credit transation for "Ticket Form"
  creditTransaction() {
    this.hasTip = true;
  }

  //Function used to check if a ticket has a total
  hasTotal(ticket: Ticket) {
    if (ticket.total > 0) {
      return true;
    } else {
      return false;
    }
  }

  //Function used to check if a ticket has a tip
  getDriverTip(ticket: Ticket) {
    if (ticket.tip > 0) {
      return true;
    } else {
      return false;
    }
  }
}
