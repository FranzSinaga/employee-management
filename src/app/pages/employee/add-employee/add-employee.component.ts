import { Component, OnInit } from '@angular/core';
import {
  NgbDateAdapter,
  NgbDateParserFormatter,
  NgbDateStruct,
} from '@ng-bootstrap/ng-bootstrap';
import { Location } from '@angular/common';
import {
  CustomAdapter,
  CustomDateParserFormatter,
} from 'src/app/app.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { GroupService } from 'src/app/service/groupService/group.service';
import { GroupListModel } from 'src/app/model/group-list/group-list.model';
import { formatToCurrency, parseToDate } from 'src/app/utils/formatter';
import { EmployeeService } from 'src/app/service/employeeService/employee.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css'],
  providers: [
    { provide: NgbDateAdapter, useClass: CustomAdapter },
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter },
  ],
})
export class AddEmployeeComponent implements OnInit {
  constructor(
    private _location: Location,
    private groupService: GroupService,
    private employeeService: EmployeeService,
    private toastr: ToastrService
  ) {}

  groupList: Array<GroupListModel>;
  groupListResult: Array<GroupListModel>;
  today: String = new Date().toISOString().split('.')[0];
  employeeForm: FormGroup = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    birthDate: new FormControl('', [Validators.required]),
    basicSalary: new FormControl('', [Validators.required]),
    basicSalaryValue: new FormControl('', [Validators.required]),
    status: new FormControl('', [Validators.required]),
    group: new FormControl('Energy', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    groupSearchValue: new FormControl(''),
  });

  ngOnInit() {
    this.groupList = this.groupService.getProductList();
    this.groupListResult = this.groupService.getProductList();

    this.employeeForm
      .get('groupSearchValue')
      .valueChanges.subscribe((value) => {
        if (value === '') {
          this.groupListResult = this.groupList;
        } else {
          this.groupListResult = this.groupListResult.filter((e) => {
            return e.value.indexOf(value) > -1;
          });
        }
      });
  }

  back() {
    this._location.back();
  }

  onGroupSelected(group: String) {
    this.employeeForm.patchValue({
      group: group,
    });
  }

  addEmployee() {
    const req = this.employeeForm;
    const groupTemp = this.group.value;
    this.employeeService.setAllEmployee(req.value);
    this.employeeForm.reset();
    this.employeeForm.patchValue({
      group: groupTemp,
    });
    this.toastr.success('Add employee successfull', 'Success', {
      closeButton: true,
    });
    // console.log('add');
  }

  formatBasicSalary() {
    let separator: any;
    var number_string = this.basicSalaryValue.value
      .replace(/[^,\d]/g, '')
      .toString();
    var split = number_string.split(',');
    var sisa = split[0].length % 3;
    var rupiah = split[0].substr(0, sisa);
    var ribuan = split[0].substr(sisa).match(/\d{3}/gi);

    if (ribuan) {
      separator = sisa ? '.' : '';
      rupiah += separator + ribuan.join('.');
    }

    rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
    this.employeeForm.patchValue({
      basicSalaryValue: rupiah,
      basicSalary: rupiah.replaceAll('.', ''),
    });
    return rupiah;
  }

  get username() {
    return this.employeeForm.get('username');
  }
  get email() {
    return this.employeeForm.get('email');
  }
  get firstName() {
    return this.employeeForm.get('firstName');
  }
  get lastName() {
    return this.employeeForm.get('lastName');
  }
  get birthDate() {
    return this.employeeForm.get('birthDate');
  }
  get basicSalary() {
    return this.employeeForm.get('basicSalary');
  }
  get status() {
    return this.employeeForm.get('status');
  }
  get group() {
    return this.employeeForm.get('group');
  }
  get description() {
    return this.employeeForm.get('description');
  }
  get basicSalaryValue() {
    return this.employeeForm.get('basicSalaryValue');
  }
}
