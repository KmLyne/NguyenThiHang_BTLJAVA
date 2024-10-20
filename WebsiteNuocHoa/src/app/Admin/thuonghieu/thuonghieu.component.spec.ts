import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThuonghieuComponent } from './thuonghieu.component';

describe('ThuonghieuComponent', () => {
  let component: ThuonghieuComponent;
  let fixture: ComponentFixture<ThuonghieuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThuonghieuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThuonghieuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
