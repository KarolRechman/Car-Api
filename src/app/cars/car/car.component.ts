import { Component, OnInit } from '@angular/core';
import { CarService } from 'src/app/shared/car.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})

/**
 * Class responsible for html form, processes data, implements OnInit class
 */
export class CarComponent implements OnInit {

   /**
   * Class constructor
   * 
   * @param {object} service inheritance of CarService
   * @param {object} toaster inheritance of ToastrService, plugin for "popup" infos
   */
  constructor(private service: CarService,
    private toaster: ToastrService) { }

    /**
     * Method firing up at the very start, when the page is loaded
     */
  ngOnInit() {
    this.resetForm();
    this.service.refreshList();
  }

  /**
   * Methods that resets html form, makes it empty
   * 
   * @param {NgForm} form data in html form
   */
  resetForm(form?: NgForm) {
    if (form != null)
      form.resetForm();
    this.service.formData = {
      producer: null,
      model: null,
      id: null
    }
  }

  /**
   * Method which submits data from html form to back-end server
   * 
   * @param {NgForm} form data in html form
   */
  onSubmit(form: NgForm) {
    if (form.value.id == null) {
      this.insertRecord(form);
    }
    else {
      this.updateRecord(form);
    }
  }

  /**
   * Method that inserts new Car
   * 
   * @param {NgForm} form data in html form 
   */
  insertRecord(form: NgForm) {
    this.service.postCar(form.value).subscribe(res => {
      this.toaster.success('Car added succesfully !');
      this.resetForm(form);
      this.service.refreshList();
    });
  }

  /**
   * Method that updates the Car
   * 
   * @param {NgForm} form data in html form 
   */
  updateRecord(form: NgForm) {
    this.service.putCar(form.value).subscribe(res => {
      this.toaster.info('Car updated succesfully !');
      this.resetForm(form);
      this.service.refreshList();
    });
  }
}
