import { Injectable } from '@angular/core';
import { employee } from '../mocks/employee.js';
@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor() {}

  async getEmployee() {
    const response = await employee();
    return response;
  }
}
