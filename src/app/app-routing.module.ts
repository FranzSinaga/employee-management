import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { AddEmployeeComponent } from './pages/employee/add-employee/add-employee.component';
import { DetailEmployeeComponent } from './pages/employee/detail-employee/detail-employee.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  {
    path: 'employee',
    children: [
      { path: 'add', component: AddEmployeeComponent },
      { path: 'detail', component: DetailEmployeeComponent },
    ],
    canActivate: [AuthGuard],
  },
  // { path: 'add/employee', component: AddEmployeeComponent },
  // { path: 'detail/employee', component: DetailEmployeeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
