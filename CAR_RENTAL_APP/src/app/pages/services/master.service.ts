import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { ApiResponse, Car, CarModel } from '../../model/car';
import { BookingDetail } from '../../model/bookingDetail';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(private http: HttpClient) { }
  private carSignal = signal<Car[]>([]);
  cars$ = this.carSignal.asReadonly();
  messageSignal = signal<string | null>(null);

  private bookingListSignal = signal<any[]>([]);
  bookings$ = this.bookingListSignal.asReadonly();

  getAllCars() {
    this.http.get<ApiResponse>('https://freeapi.miniprojectideas.com/api/CarRentalApp/GetCars').
      subscribe({
        next: (response) => {
          if (response.result) {
            this.carSignal.set(response.data || []);
          } else {
            console.error('Failed to fetch cars:', response.message);
          }
        },
        error: (error) => {
          console.error('Error fetching cars:', error);
        }
      });
  }

  createNewCar(car: Car) {
    this.http.post<any>('https://freeapi.miniprojectideas.com/api/CarRentalApp/CreateNewCar', car)
      .subscribe((res) => {
        if (res.result && res.data) {
          this.carSignal.update((oldCars) => [...oldCars, res.data!]);
          this.messageSignal.set('Car saved successfully! 🚗✅');
        } else {
          this.messageSignal.set('Failed to save car ❌');
        }
      });
  }

  modifyCar(car: Car) {
    this.http.put<ApiResponse>('https://freeapi.miniprojectideas.com/api/CarRentalApp/UpdateCar', car)
      .subscribe((res) => {
        if (res.result && res.data) {
          this.carSignal.update((oldCars) => [...oldCars, res.data!]);
          this.messageSignal.set('Car Updated successfully! 🚗✅');
        } else {
          this.messageSignal.set('Failed to update car ❌');
        }
      });
  }

  deleteCar(carId: number) {
    this.http.delete<ApiResponse>(`https://freeapi.miniprojectideas.com/api/CarRentalApp/DeleteCarbyCarId?carid=${carId}`)
      .subscribe((res) => {
        if (res.result) {
          // ✅ Remove the deleted car from signal
          this.carSignal.update((oldCars) =>
            oldCars.filter((car) => car.carId !== carId)
          );
          this.messageSignal.set('Car deleted successfully 🗑️');
        } else {
          this.messageSignal.set('Failed to delete car ❌');
        }
      });
  }

  //booking services
  getAllBookings() {
    this.http.get<ApiResponse>('https://freeapi.miniprojectideas.com/api/CarRentalApp/geAllBookings').subscribe({
      next: (response) => {
        if (response.result) {
          this.bookingListSignal.set(response.data || []);
        } else {
          console.error('Failed to fetch bookings:', response.message);
        }
      },
      error: (error) => {
        console.error('Error fetching bookings:', error);
      }
    })
  }

  createNewBooking(bookingDetail: BookingDetail) {
    this.http.post<any>('https://freeapi.miniprojectideas.com/api/CarRentalApp/CreateNewCar', bookingDetail)
      .subscribe((res) => {
        if (res.result && res.data) {
          this.bookingListSignal.update((oldBookingList) => [...oldBookingList, res.data!]);
          this.messageSignal.set('Booking details saved successfully! 🚗✅');
        } else {
          this.messageSignal.set('Failed to save booking details ❌');
        }
      });
  }
}
