import { DriverService } from './_services/driver.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ModalModule } from 'ngx-bootstrap/modal';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainComponent } from './main/main.component';
import { HeaderComponent } from './header/header.component';
import { CreateDriverComponent } from './create-driver/create-driver.component';
import { CreateDeliverysComponent } from './create-deliverys/create-deliverys.component';
import { DeliveryComponent } from './delivery/delivery.component';
import { TicketModalComponent } from './ticket-modal/ticket-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HeaderComponent,
    CreateDriverComponent,
    CreateDeliverysComponent,
    DeliveryComponent,
    TicketModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ModalModule.forRoot(),
    CarouselModule.forRoot(),
    AccordionModule.forRoot(),
  ],
  providers: [DriverService],
  bootstrap: [AppComponent],
})
export class AppModule {}
