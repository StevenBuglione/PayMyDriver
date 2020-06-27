import { Driver } from './../models/driver';
import {
  faCoffee,
  faUsers,
  faDollarSign,
  faClock,
} from '@fortawesome/free-solid-svg-icons';

import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-driver',
  templateUrl: './create-driver.component.html',
  styleUrls: ['./create-driver.component.css'],
})
export class CreateDriverComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  driver: Driver;
  driverForm: FormGroup;
  faUsers = faUsers;
  faMoney = faDollarSign;
  formattedAmount: string = '0';
  value: any;
  faClock = faClock;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.createDriverForm();
  }

  createDriverForm() {
    this.driverForm = this.fb.group({
      name: ['', Validators.required],
      pay: ['', Validators.required],
      hours: [''],
    });
  }

  register() {
    if (this.driverForm.valid) {
      this.driver = Object.assign({}, this.driverForm.value);
      this.driver.tickets = [];
      localStorage.setItem('driver', JSON.stringify(this.driver));
    }
  }

  cancel() {
    return this.createDriverForm();
  }
}
