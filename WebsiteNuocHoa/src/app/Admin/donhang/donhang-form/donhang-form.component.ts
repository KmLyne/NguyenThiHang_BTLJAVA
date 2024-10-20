import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Donhang } from '../donhang.model';
import { DonhangService } from '../donhang.service';

@Component({
  selector: 'app-donhang-form',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, RouterLink],
  templateUrl: './donhang-form.component.html',
  styleUrl: './donhang-form.component.css'
})
export class DonhangFormComponent {
  donhang: Donhang = {
    madh: 0,
    ngaydathang: '',
    tenkh: '',
    diachi: '',
    sdt: '',
    email: '',
    ghichu: '',
    trangthai: '',
    tongtien: 0,
    sanPhamList: [],
    
  };
  message: string = '';

  constructor(
    private donhangService: DonhangService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.donhangService.getDonhangById(Number(id)).subscribe(
        (donhang) => {
          this.donhang = donhang;
        },
        (error) => console.error(error)
      );
    }
  }
  saveDonhang(): void {
    if (this.donhang.madh) {
      this.donhangService.updateDonhang(this.donhang.madh, this.donhang).subscribe(() => {
        this.message = 'Đơn hàng được cật nhật thành công!';
        alert(this.message)
        this.router.navigate(['/donhang']);
      });
    } else {
      this.donhangService.createDonhang(this.donhang).subscribe(() => {
        this.message = 'Đơn hàng được thêm thành công!';
        alert(this.message)
        this.router.navigate(['/donhang']);
      });
    }
  }
}