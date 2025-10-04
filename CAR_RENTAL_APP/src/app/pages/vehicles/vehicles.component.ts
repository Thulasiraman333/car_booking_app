import { Component, inject } from '@angular/core';
import { Car, CarModel } from '../../model/car';
import { FormsModule } from '@angular/forms';
import { MasterService } from '../services/master.service';

@Component({
  selector: 'app-vehicles',
  imports: [FormsModule],
  templateUrl: './vehicles.component.html',
  styleUrl: './vehicles.component.scss'
})
export class VehiclesComponent {

  newCarObj: CarModel;
  constructor() {
    this.newCarObj = new CarModel();
  }
  carService = inject(MasterService);
  cars = this.carService.cars$;
  message = this.carService.messageSignal;

  ngOnInit() {
    this.carService.getAllCars();
  }

  saveCar() {
    this.carService.createNewCar(this.newCarObj);
    this.newCarObj = { carId: 0, brand: '', model: '', year: 0, color: '', dailyRate: 0, carImage: '', regNo: '' }; // reset form
  }

  editCar(car: CarModel) {
    this.newCarObj = { ...car };

  }
  deleteCar(carId: number) {
    if (confirm('Are you sure you want to delete this car?')) {
      this.carService.deleteCar(carId);
    }
  }
  updateCar(car: Car) {
    this.carService.modifyCar(this.newCarObj);
    this.newCarObj = { carId: 0, brand: '', model: '', year: 0, color: '', dailyRate: 0, carImage: '', regNo: '' }; // reset form
  }
}
