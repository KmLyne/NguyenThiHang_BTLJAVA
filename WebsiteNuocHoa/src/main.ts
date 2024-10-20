import { ApplicationConfig } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { SanphamComponent } from './app/Admin/sanpham/sanpham.component';
import { TaikhoanComponent } from './app/Admin/taikhoan/taikhoan.component';
import { ThuonghieuComponent } from './app/Admin/thuonghieu/thuonghieu.component';
import { XuatxuComponent } from './app/Admin/xuatxu/xuatxu.component';
import { DonhangComponent } from './app/Admin/donhang/donhang.component';
import { LoginComponent } from './app/Admin/login/login.component';

import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app/app.component';

const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch()),
    provideRouter(routes),
    ReactiveFormsModule,
  ]
};

bootstrapApplication(AppComponent, appConfig);
