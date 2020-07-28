import { Injectable } from '@angular/core';
import { Car } from './car.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
/**
 * Service class with basic CRUD methods
 */
export class CarService {

  /**
   * URL address for back-end server 
   */
  //apiURL = 'http://localhost:8080/carapi/api/car'
  apiURL = 'http://192.168.43.86:8080/carapi/api/car';

  /**
   * Variable which contains Car object, that is visible in html form
   */
  formData: Car;
  list: Car[];

  /**
   * Http headers containing json data
   */
  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json',  }) };

  constructor(private _http: HttpClient) { }
  /**
   * Method responsible for Http Post Request, saves car
   * 
   * @param {object} formData 
   */
  postCar(formData: Car): Observable<Car[]> {
    return this._http.post<Car[]>(this.apiURL, formData, this.httpOptions);
  }

  /**
   * Method responsible for Http Get Request
   * 
   * @returns {List} List with all Cars 
   */
  async refreshList() {
    const res = await this._http.get(this.apiURL).toPromise();
    return this.list = (res as Car[]); 
  }
  /**
   * Method responsible for Http Put Request, updates single record
   * 
   * @param {object} formData 
   */
  putCar(formData: Car): Observable<Car[]> {
    return this._http.put<Car[]>(this.apiURL+'/'+formData.id, formData, this.httpOptions);
    
  }
  /**
   * Method responsible for Http Delete Request, deletes single record
   * 
   * @param {number} id car id
   */
  deleteCar(id: number){   
    return this._http.delete<Car[]>(this.apiURL+'/'+id,this.httpOptions);
  }
}
