export class CarModel {
  carId: number
  brand: string
  model: string
  year: number
  color: string
  dailyRate: number
  carImage: string
  regNo: string


  constructor() {
    this.carId = 0;
    this.brand = '';
    this.model = '';
    this.year = 0;
    this.color = '';
    this.dailyRate = 0;
    this.carImage = '';
    this.regNo = '';
  }
}

export interface ApiResponse {
  result: boolean;
  message: string;
  data?: any; // Optional data field for additional information
}

export interface Car {
  carId: number
  brand: string
  model: string
  year: number
  color: string
  dailyRate: number
  carImage: string
  regNo: string
}