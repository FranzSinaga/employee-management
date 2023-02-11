import { Injectable } from '@angular/core';
import { EmployeeModel } from 'src/app/model/employee/employee-model.model.js';
import { employee } from '../mocks/employee.js';
@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor() {}

  async getEmployee() {
    const response = await fetch('http://localhost:3000/employee').then((res) =>
      res.json()
    );
    // const response = await employee();
    return response;
  }

  async setAllEmployee(req: EmployeeModel) {
    console.log(req);
    const res = await fetch('http://localhost:3000/employee', {
      method: 'POST',
      body: JSON.stringify({
        username: req.username,
        firstName: req.username,
        lastName: req.lastName,
        email: req.email,
        birthDate: req.birthDate,
        basicSalary: req.basicSalary,
        status: req.status,
        group: req.group,
        description: req.description,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    }).then((res) => res.json());
    return res;
  }
}
