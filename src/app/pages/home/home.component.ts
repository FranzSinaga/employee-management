import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getItemFromSessionStorage } from 'src/storage';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    const session = getItemFromSessionStorage('session');
    console.log(session)
    if (session === null) {
      this.router.navigateByUrl('login');
    }
  }
}
