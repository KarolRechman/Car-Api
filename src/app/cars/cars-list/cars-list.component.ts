import { Component, OnInit } from '@angular/core';
import { CarService } from 'src/app/shared/car.service';
import { Car } from 'src/app/shared/car.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cars-list',
  templateUrl: './cars-list.component.html',
  styleUrls: ['./cars-list.component.css']
})
/**
 * Class responsible for Cars List, implements OnInit class
 */
export class CarsListComponent implements OnInit {

  /**
   * Class constructor
   * 
   * @param {object} service inheritance of CarService
   * @param {object} toaster inheritance of ToastrService, plugin for "popup" infos
   */
  constructor(private service: CarService, private toaster: ToastrService) { }

  ngOnInit() {
  }

  /**
   * On click method, pulls out Car object from list
   * 
   * @param car 
   */
  populateForm(car: Car){
    this.service.formData = Object.assign({},car);
  }

  /**
   * Method which deletes "Car" object with specific id number
   * 
   * @param {number} id 
   */
  deleteCar(id: number){
    if(confirm('Are u sure?')){
    this.service.deleteCar(id).subscribe(res => {
      this.toaster.warning('Car deleted succesfully !');
      this.service.refreshList();
    });
    }
  }

}
