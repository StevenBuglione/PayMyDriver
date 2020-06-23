import { faCoffee, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { DriverService } from './../_services/driver.service';
import { Driver } from './../models/driver';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-deliverys',
  templateUrl: './create-deliverys.component.html',
  styleUrls: ['./create-deliverys.component.css'],
})
export class CreateDeliverysComponent implements OnInit {
  driver: Driver;
  faPlus = faPlusCircle;

  constructor() {}

  ngOnInit() {
    this.driver = JSON.parse(localStorage.getItem('driver'));
  }

  updateDriverDetails() {
    this.driver = JSON.parse(localStorage.getItem('driver'));
  }
}
