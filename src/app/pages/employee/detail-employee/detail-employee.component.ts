import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { formatToCurrency } from 'src/app/utils/formatter';
import { Location } from '@angular/common';

@Component({
  selector: 'app-detail-employee',
  templateUrl: './detail-employee.component.html',
  styleUrls: ['./detail-employee.component.css'],
})
export class DetailEmployeeComponent implements OnInit {
  employee: any;
  constructor(private location: Location, private router: Router) {
    console.log(this.router.getCurrentNavigation().extras.state);
    this.employee = this.router.getCurrentNavigation().extras.state;
  }

  ngOnInit(): void {}

  formatSalary(e: Number) {
    return `Rp ${formatToCurrency(e)}`;
  }

  formatDate(e: any) {
    if (e.includes('T')) {
      const date = e.split('T')[0];
      console.log(date);
      const split = date.split('-');
      return `${split[2]}/${split[1]}/${split[0]}`;
    }
    return e;
  }

  back() {
    this.location.back();
  }
}
