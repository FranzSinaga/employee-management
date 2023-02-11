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

function setDate(e: NgbDateStruct) {
  const DELIMITER = '/';
  return e.day + DELIMITER + e.month + DELIMITER + e.year;
}

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
    private groupService: GroupService
  ) {}

  groupList: Array<GroupListModel>;
  groupListResult: Array<GroupListModel>;
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

  onDescriptionSelect(e: NgbDateStruct) {
    this.employeeForm.patchValue({
      description: setDate(e),
    });
  }

  onBirthDateSelect(e: NgbDateStruct) {
    this.employeeForm.patchValue({
      birthDate: setDate(e),
    });
  }

  onGroupSelected(group: String) {
    this.employeeForm.patchValue({
      group: group,
    });
  }

  addEmployee() {
    console.log('add')
  }

  get username() { return this.employeeForm.get('username')}
  get email() { return this.employeeForm.get('email')}
  get firstName() { return this.employeeForm.get('firstName')}
  get lastName() { return this.employeeForm.get('lastName')}
  get birthDate() { return this.employeeForm.get('birthDate')}
  get basicSalary() { return this.employeeForm.get('basicSalary')}
  get status() { return this.employeeForm.get('status')}
  get group() { return this.employeeForm.get('group')}
  get description() { return this.employeeForm.get('description')}
}
