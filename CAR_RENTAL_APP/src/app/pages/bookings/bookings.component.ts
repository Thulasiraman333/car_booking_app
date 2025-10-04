import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BookingDetail } from '../../model/bookingDetail';
import { CommonModule, DatePipe } from '@angular/common';
import { MasterService } from '../services/master.service';

@Component({
  selector: 'app-bookings',
  imports: [FormsModule, DatePipe, CommonModule],
  templateUrl: './bookings.component.html',
  styleUrl: './bookings.component.scss'
})
export class BookingsComponent {

  newBooking: BookingDetail;

  bookingService = inject(MasterService);
  bookings = this.bookingService.bookings$;
  cars = this.bookingService.cars$;
  message = this.bookingService.messageSignal;

  constructor() {
    this.newBooking = new BookingDetail();
  }

  ngOnInit() {
    this.bookingService.getAllBookings();
    this.bookingService.getAllCars();
  }

  saveBooking() {
    this.bookingService.createNewBooking(this.newBooking);
    this.newBooking = {
      customerName: '',
      customerCity: '',
      mobileNo: '',
      email: '',
      bookingId: 0,
      carId: 0,
      bookingDate: '',
      discount: 0,
      totalBillAmount: 0
    }; // reset form
  }
  refreshBookings() {

  }
  deleteBooking(arg0: any) {

  }
  editBooking(_t14: any) {

  }
}
