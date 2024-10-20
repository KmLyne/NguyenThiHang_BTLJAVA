import { Component } from '@angular/core';
import { Thuonghieu } from '../thuonghieu.model';
import { ThuonghieuService } from '../thuonghieu.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-thuonghieu-form',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, RouterLink],
  templateUrl: './thuonghieu-form.component.html',
  styleUrl: './thuonghieu-form.component.css'
})
export class ThuonghieuFormComponent {
  thuonghieu: Thuonghieu = {
    math: 0,
    tenth: '',
  };

  message: string = '';

  constructor(
    private thuonghieuService: ThuonghieuService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.thuonghieuService.getThuonghieuById(Number(id)).subscribe(
        (thuonghieu) => {
          this.thuonghieu = thuonghieu;
        },
        (error) => console.error(error)
      );
    }
  }
  saveThuonghieu(): void {
    if (this.thuonghieu.math) {
      this.thuonghieuService.updateThuonghieu(this.thuonghieu.math, this.thuonghieu).subscribe(() => {
        this.message = 'Thương hiệu được cật nhật thành công!';
        alert(this.message)
        this.router.navigate(['/thuonghieu']);
      });
    } else {
      this.thuonghieuService.createThuonghieu(this.thuonghieu).subscribe(() => {
        this.message = 'Thương hiệu được thêm thành công!';
        alert(this.message)
        this.router.navigate(['/thuonghieu']);
      });
    }
  }
}
