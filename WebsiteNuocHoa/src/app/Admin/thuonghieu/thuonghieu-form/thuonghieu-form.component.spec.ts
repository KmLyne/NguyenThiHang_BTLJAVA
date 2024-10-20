import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThuonghieuFormComponent } from './thuonghieu-form.component';

describe('ThuonghieuFormComponent', () => {
  let component: ThuonghieuFormComponent;
  let fixture: ComponentFixture<ThuonghieuFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThuonghieuFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThuonghieuFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
