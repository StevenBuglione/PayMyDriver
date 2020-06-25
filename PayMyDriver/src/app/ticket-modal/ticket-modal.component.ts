import { DriverService } from './../_services/driver.service';
import { Driver } from './../models/driver';
import { Ticket } from './../models/ticket';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import {
  faMapMarkedAlt,
  faMapMarkerAlt,
  faMoneyBillWaveAlt,
  faWallet,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'modal-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title pull-left">{{ title }}</h4>
      <button
        type="button"
        class="btn btn-info "
        aria-label="Close"
        (click)="bsModalRef.hide()"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <form [formGroup]="ticketForm" (ngSubmit)="createTicket()">
        <hr />
        <div class="form-group ml-4">
          <label class="control-label mr-2">Payment Type: </label>
          <label class="radio-inline">
            <input
              class="mr-3"
              type="radio"
              value="Cash"
              formControlName="paymentType"
              (click)="noTip()"
            />Cash
          </label>
          <label class="radio-inline ml-3">
            <input
              class="mr-3"
              type="radio"
              value="Credit"
              formControlName="paymentType"
              (click)="getTip()"
            />Credit
          </label>
        </div>
        <div class="d-flex flex-column">
          <div class="d-flex justify-content-center">
            <div class="form-group ">
              <div class="d-inline-flex">
                <fa-icon
                  [icon]="faMap"
                  class="mr-3 align-self-center"
                ></fa-icon>
                <input
                  type="text"
                  class="form-control"
                  formControlName="address"
                  placeholder="Address(Optional)"
                />
              </div>
            </div>
          </div>

          <div class="d-flex justify-content-center">
            <div class="form-group align-items-center">
              <div class="d-inline-flex">
                <fa-icon
                  [icon]="faMoney"
                  class="mr-2 align-self-center"
                ></fa-icon>
                <input
                  class="form-control"
                  required
                  pattern="[0-9/.]+"
                  placeholder="Total"
                  formControlName="total"
                />
              </div>
            </div>
          </div>

          <div class="d-flex justify-content-center" *ngIf="hasTip">
            <div class="form-group align-items-center">
              <div class="d-inline-flex">
                <fa-icon
                  [icon]="faWallet"
                  class="mr-3 align-self-center"
                ></fa-icon>
                <input
                  class="form-control"
                  pattern="[0-9/.]+"
                  placeholder="Tip"
                  formControlName="tip"
                />
              </div>
            </div>
          </div>

          <div class="form-group text-center">
            <button
              class="btn btn-success"
              [disabled]="!ticketForm.valid"
              type="submit"
              (click)="updateView()"
              (click)="bsModalRef.hide()"
            >
              Register
            </button>
          </div>
        </div>
      </form>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-danger" (click)="bsModalRef.hide()">
        {{ closeBtnName }}
      </button>
    </div>
  `,
})
export class TicketModalComponent implements OnInit {
  title: string;
  closeBtnName: string;
  list: any[] = [];
  ticketForm: FormGroup;
  ticket: Ticket;
  faMap = faMapMarkerAlt;
  faMoney = faMoneyBillWaveAlt;
  faWallet = faWallet;
  hasTip: boolean = false;
  driver: Driver;
  newTicket: boolean;

  constructor(
    public bsModalRef: BsModalRef,
    private fb: FormBuilder,
    private driverService: DriverService
  ) {}

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
  }

  getTicketId() {
    return this.driver.tickets.length;
  }

  ngOnInit() {
    this.createTicketForm();
  }

  noTip() {
    this.hasTip = false;
  }

  getTip() {
    this.hasTip = true;
  }

  updateView() {
    this.driverService.onFirstComponentButtonClick();
  }
}
