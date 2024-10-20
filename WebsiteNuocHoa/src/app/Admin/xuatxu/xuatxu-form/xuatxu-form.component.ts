import { Component } from '@angular/core';
import { Xuatxu } from '../xuatxu.model';
import { XuatxuService } from '../xuatxu.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-xuatxu-form',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, RouterLink],
  templateUrl: './xuatxu-form.component.html',
  styleUrl: './xuatxu-form.component.css'
})
export class XuatxuFormComponent {
  xuatxu: Xuatxu = {
    maxx: 0,
    tenxx: '',
  };

  message: string = '';

  constructor(
    private xuatxuService: XuatxuService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.xuatxuService.getXuatxuById(Number(id)).subscribe(
        (xuatxu) => {
          this.xuatxu = xuatxu;
        },
        (error) => console.error(error)
      );
    }
  }
  saveXuatxu(): void {
    if (this.xuatxu.maxx) {
      this.xuatxuService.updateXuatxu(this.xuatxu.maxx, this.xuatxu).subscribe(() => {
        this.message = 'Xuất xứ được cật nhật thành công!';
        alert(this.message)
        this.router.navigate(['/xuatxu']);
      });
    } else {
      this.xuatxuService.createXuatxu(this.xuatxu).subscribe(() => {
        this.message = 'Xuất xứ được thêm thành công!';
        alert(this.message)
        this.router.navigate(['/xuatxu']);
      });
    }
  }
}
