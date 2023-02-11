import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastNoAnimationModule, ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { AddEmployeeComponent } from './pages/employee/add-employee/add-employee.component';
import { DashboardEmployeeComponent } from './pages/employee/dashboard-employee/dashboard-employee.component';

import { GroupService } from './service/groupService/group.service';
import { EmployeeService } from './service/employeeService/employee.service';
import { LoginService } from './service/loginService/login.service';
import { DetailEmployeeComponent } from './pages/employee/detail-employee/detail-employee.component';
import { AuthGuard } from './auth/auth.guard';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    PageNotFoundComponent,
    AddEmployeeComponent,
    DashboardEmployeeComponent,
    DetailEmployeeComponent,
  ],
  providers: [GroupService, EmployeeService, LoginService, AuthGuard],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    NgbModule,
    FormsModule,
    NgxPaginationModule,
    ToastNoAnimationModule.forRoot(),
  ],
})
export class AppModule {}
