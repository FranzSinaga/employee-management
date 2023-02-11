import { Component, OnInit } from '@angular/core';
import { EmployeeModel } from 'src/app/model/employee/employee-model.model';
import { EmployeeService } from 'src/app/service/employeeService/employee.service';

interface TableHeader {
  label: String;
  value: String;
}

export const formatToCurrency = (
  value: any,
  withoutCommaSeparator: boolean = false
) => {
  const a = value.toString();
  let b = a.split('.')[0];

  b = b === '' ? '0' : b.replace(/[,.]/g, '').toString();
  if (!withoutCommaSeparator) {
    b = b.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
  }
  return `${b}.00`;
};

export const parseToDate = (data: String): any => {
  const [day, month, year] = data.split('/');
  const date = new Date(+year, parseInt(month) - 1, +day);
  return date;
};

@Component({
  selector: 'app-dashboard-employee',
  templateUrl: './dashboard-employee.component.html',
  styleUrls: ['./dashboard-employee.component.css'],
})
export class DashboardEmployeeComponent implements OnInit {
  constructor(private employeeService: EmployeeService) {}

  allEmployee: Array<EmployeeModel>;
  // sortByList: Array<String>;
  sortValue: String = 'username';

  tableHeader: Array<TableHeader> = [
    { label: 'Username', value: 'username' },
    { label: 'First Name', value: 'firstName' },
    { label: 'Last Name', value: 'lastName' },
    { label: 'Email', value: 'email' },
    // { label: 'Birth Date', value: 'birthDate' },
    // { label: 'Basic Salary', value: 'basicSalary' },
    // { label: 'Status', value: 'status' },
    // { label: 'Group', value: 'group' },
    // { label: 'Description', value: 'description' },
  ];

  async ngOnInit(): Promise<void> {
    this.allEmployee = await this.employeeService.getEmployee();
    this.sortData(this.sortValue);
    // if (this.allEmployee.length >= 0 || this.allEmployee !== undefined) {
    //   this.sortByList = Object.keys(this.allEmployee[0]);
    // }
  }

  formatSalary(e: Number) {
    return `Rp ${formatToCurrency(e)}`;
  }

  sortData(value: String): Array<EmployeeModel> {
    this.sortValue = value;
    let sortedData: Array<EmployeeModel>;
    if (value === 'basicSalary' || value === 'id') {
      sortedData = this.allEmployee.sort((a, b) => {
        return a.basicSalary - b.basicSalary;
      });
    } else if (value === 'birthDate' || value === 'description') {
      sortedData = this.allEmployee.sort((a, b) => {
        return parseToDate(a[`${value}`]) - parseToDate(b[`${value}`]);
      });
    } else {
      sortedData = this.allEmployee.sort((a, b) => {
        let x = a[`${value}`].toLowerCase();
        let y = b[`${value}`].toLowerCase();
        if (x > y) return 1;
        if (x < y) return -1;
        return 0;
      });
    }

    return sortedData;
  }
}
