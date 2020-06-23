import { Driver } from './../models/driver';
import {
  faCoffee,
  faUsers,
  faDollarSign,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Icon } from '@fortawesome/fontawesome-svg-core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';

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

  constructor(private fb: FormBuilder, private currencyPipe: CurrencyPipe) {}

  ngOnInit() {
    this.createDriverForm();
  }

  createDriverForm() {
    this.driverForm = this.fb.group({
      name: ['', Validators.required],
      pay: ['', Validators.required],
    });
  }

  register() {
    if (this.driverForm.valid) {
      this.driver = Object.assign({}, this.driverForm.value);
      localStorage.setItem('drive', JSON.stringify(this.driver));
    }
  }

  cancel() {
    return this.createDriverForm();
  }
}
