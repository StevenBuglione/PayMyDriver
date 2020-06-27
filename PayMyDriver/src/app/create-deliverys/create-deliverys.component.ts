import {
  faCoffee,
  faPlusCircle,
  faMapMarkerAlt,
  faMoneyBillWaveAlt,
  faWallet,
  faEdit,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { Driver } from './../models/driver';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Ticket } from '../models/ticket';
import { tick } from '@angular/core/testing';

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
  faEdit = faEdit;
  ticketId = -1;
  ///////////////////
  //Create Ticket Form Variables
  ticketForm: FormGroup;
  ticket: Ticket;
  faMap = faMapMarkerAlt;
  faMoney = faMoneyBillWaveAlt;
  faWallet = faWallet;
  hasTip: boolean = false;
  //////////////////////////////////
  //Edit Ticket Form Variable
  editForm: FormGroup;
  ticketToEdit: Ticket;
  editTicketId: number;
  //Delete Ticket
  faTrash = faTrash;

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

  //to get the id of a ticket
  numberOfTickets() {
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
    return ticketList.length;
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
      if (this.ticket.paymentType == 'Credit') {
        this.ticket.total = 0;
      }
      this.ticket.id = this.numberOfTickets();
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

  ////////////////////////////////////
  //This will contain the logic for editing a created ticket

  //Opens the Ticket Edit form
  editTicketForm(template: TemplateRef<any>, ticket: Ticket) {
    this.ticketToEdit = ticket;
    this.editTicketId = ticket.id;
    this.setEditTicketForm(ticket);
    this.modalRef = this.modalService.show(template);
  }

  //Set Edit Ticket Form
  setEditTicketForm(ticket: Ticket) {
    this.editForm = this.fb.group({
      paymentType: [ticket.paymentType, Validators.required],
      address: [ticket.address],
      total: [ticket.total],
      tip: [ticket.tip],
    });
    if (ticket.total == 0) {
      this.hasTip = true;
    }
  }

  //This function will update the current ticket
  updateTicket() {
    this.ticketToEdit = Object.assign({}, this.editForm.value);
    if (this.ticketToEdit.paymentType == 'Credit') {
      this.ticketToEdit.total = 0;
    }
    this.ticketToEdit.id = this.editTicketId;
    var n = this.editTicketId;
    console.log(n);
    this.tickets = this.getTickets();
    this.tickets[n] = this.ticketToEdit;
    this.driver.tickets = this.tickets;
    console.log(this.driver);

    localStorage.setItem('driver', JSON.stringify(this.driver));
  }

  //This function will delete the current ticket
  //Opens the Ticket Creation form
  deleteTicket(template: TemplateRef<any>, ticket: Ticket) {
    this.modalRef = this.modalService.show(template);
    this.editTicketId = this.ticketId;
  }

  removeTicket() {
    var n = this.editTicketId;
    this.tickets = this.getTickets();
    this.tickets.splice(n);
    this.driver.tickets = this.tickets;
    localStorage.setItem('driver', JSON.stringify(this.driver));
  }
}
