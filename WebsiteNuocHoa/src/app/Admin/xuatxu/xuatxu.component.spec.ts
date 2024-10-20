import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XuatxuComponent } from './xuatxu.component';

describe('XuatxuComponent', () => {
  let component: XuatxuComponent;
  let fixture: ComponentFixture<XuatxuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [XuatxuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(XuatxuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
