import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SanphamFormComponent } from './sanpham-form.component';

describe('SanphamFormComponent', () => {
  let component: SanphamFormComponent;
  let fixture: ComponentFixture<SanphamFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SanphamFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SanphamFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
