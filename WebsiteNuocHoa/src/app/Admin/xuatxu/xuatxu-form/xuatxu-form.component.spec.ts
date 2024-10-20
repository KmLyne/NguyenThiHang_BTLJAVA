import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XuatxuFormComponent } from './xuatxu-form.component';

describe('XuatxuFormComponent', () => {
  let component: XuatxuFormComponent;
  let fixture: ComponentFixture<XuatxuFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [XuatxuFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(XuatxuFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
