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
  newTicket: boolean;

  constructor(
    private modalService: BsModalService,
    private fb: FormBuilder,
    private driverService: DriverService
  ) {}

  ngOnInit() {
    this.driver = JSON.parse(localStorage.getItem('driver'));
    this.createTicketForm();

    if (this.driverService.subsVar == undefined) {
      this.driverService.subsVar = this.driverService.invokeFirstComponentFunction.subscribe(
        () => {
          this.addGroupItem();
        }
      );
    }
    this.tickets = this.getTickets();
  }

  groups = [];

  addGroupItem(): void {
    this.addTickets();
    this.groups.push({
      title: `Delivery - ${this.groups.length + 1}`,
      content: `Test - ${this.groups.length + 1}`,
    });
    this.ngOnInit();
    console.log(this.tickets);
  }

  //To get the tickets found in the driver object
  addTickets() {
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
    this.tickets = ticketList;
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

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  /////////////////////
  createTicketForm() {
    this.ticketForm = this.fb.group({
      paymentType: ['', Validators.required],
      address: [''],
      total: [''],
      tip: [''],
    });
  }

  createTicket() {
    this.driver = JSON.parse(localStorage.getItem('driver'));

    if (this.ticketForm.valid) {
      this.ticket = Object.assign({}, this.ticketForm.value);
      this.ticket.id = this.getTicketId();
      this.driver.tickets.push(this.ticket);
      localStorage.setItem('driver', JSON.stringify(this.driver));
    }
    this.ngOnInit();
  }

  getTicketId() {
    return this.driver.tickets.length;
  }

  noTip() {
    this.hasTip = false;
  }

  getTip() {
    this.hasTip = true;
  }
}
