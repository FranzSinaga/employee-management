import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaginationInstance } from 'ngx-pagination';
import { ToastrService } from 'ngx-toastr';
import { EmployeeModel } from 'src/app/model/employee/employee-model.model';
import { EmployeeService } from 'src/app/service/employeeService/employee.service';
import { formatToCurrency } from 'src/app/utils/formatter';
import {
  getItemFromSessionStorage,
  removeSessionByKey,
  setItemToSessionStorage,
} from 'src/storage';

interface TableHeader {
  label: String;
  value: String;
}

@Component({
  selector: 'app-dashboard-employee',
  templateUrl: './dashboard-employee.component.html',
  styleUrls: ['./dashboard-employee.component.css'],
})
export class DashboardEmployeeComponent implements OnInit {
  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  allEmployee: Array<EmployeeModel> = [];
  tableHeader: Array<TableHeader> = [
    { label: 'Username', value: 'username' },
    { label: 'First Name', value: 'firstName' },
    { label: 'Last Name', value: 'lastName' },
    { label: 'Email', value: 'email' },
  ];

  itemsPerPage: number = 5;
  page: number = 1;

  async ngOnInit(): Promise<void> {
    await this.getEmployeeData();

    const tableConfig = this.getConfigTableData();
    if (tableConfig !== null) {
      console.log(tableConfig);
      this.itemsPerPage = tableConfig.itemsPerPage;
      this.paginationConfig.itemsPerPage = tableConfig.itemsPerPage;
      this.paginationConfig.currentPage = tableConfig.currentPage;
      this.searchByFirstName = tableConfig.searchByFirstName;
      this.searchByUsername = tableConfig.searchByUsername;
      this.searchEmployee();
    } else {
      this.saveConfigTableData();
    }
  }

  async getEmployeeData(): Promise<void> {
    this.allEmployee = await this.employeeService.getEmployee();
    this.sortData(this.sortValue, true);
  }

  // Sorting
  sortValue: String = 'username';
  sortByAsc: boolean = true;
  sortData(value: String, fromInit: boolean = false): Array<EmployeeModel> {
    if (!fromInit && this.sortValue === value) {
      this.sortByAsc = !this.sortByAsc;
    }

    this.sortValue = value;
    let sortedData: Array<EmployeeModel>;
    if (this.sortByAsc) {
      sortedData = this.allEmployee.sort((a, b) => {
        let x = a[`${value}`].toLowerCase();
        let y = b[`${value}`].toLowerCase();
        if (x > y) return 1;
        if (x < y) return -1;
        return 0;
      });
    } else {
      sortedData = this.allEmployee.sort((a, b) => {
        let x = a[`${value}`].toLowerCase();
        let y = b[`${value}`].toLowerCase();
        if (x > y) return -1;
        if (x < y) return 1;
        return 0;
      });
    }

    return sortedData;
  }

  // Searching
  searchByUsername: String = '';
  searchByFirstName: String = '';
  async searchEmployee(): Promise<void> {
    const username = this.searchByUsername;
    const firstName = this.searchByFirstName;
    let sortedData: Array<EmployeeModel>;
    if (username === '' && firstName === '') {
      await this.getEmployeeData();
    } else {
      sortedData = this.allEmployee.filter((e) => {
        return e.username === username && e.firstName === firstName;
      });
      this.allEmployee = sortedData;
    }
  }

  async clearSearch(): Promise<void> {
    this.searchByUsername = '';
    this.searchByFirstName = '';
    await this.getEmployeeData();
    this.saveConfigTableData();
  }

  // Pagination
  paginationConfig: PaginationInstance = {
    itemsPerPage: this.itemsPerPage,
    currentPage: this.page,
  };

  onPageChange(number: number): void {
    this.page = number;
    this.paginationConfig.currentPage = this.page;
    this.saveConfigTableData();
  }

  changeItemsPerPage(e: any) {
    this.itemsPerPage = e.target.value;
    this.paginationConfig.itemsPerPage = this.itemsPerPage;
    this.saveConfigTableData();
  }

  // Navigation
  goToDetail(employee: EmployeeModel): void {
    this.router.navigateByUrl('/employee/detail', { state: employee });
  }

  // Preserve data
  saveConfigTableData() {
    const config = {
      itemsPerPage: this.itemsPerPage,
      currentPage: this.page,
      searchByFirstName: this.searchByFirstName,
      searchByUsername: this.searchByUsername,
    };
    removeSessionByKey('employeeConfigTableData');
    setItemToSessionStorage('employeeConfigTableData', config);
  }

  getConfigTableData(): any {
    const result = getItemFromSessionStorage('employeeConfigTableData');
    console.log(result);
    return result;
  }

  // Toastr
  edit() {
    this.toastr.warning('Edit button clicked!', 'Edit', {
      closeButton: true,
      // positionClass: 'toast-bottom-center'
    });
  }

  deleteBtn() {
    this.toastr.error('Delete button clicked!', 'Delete');
  }
}
