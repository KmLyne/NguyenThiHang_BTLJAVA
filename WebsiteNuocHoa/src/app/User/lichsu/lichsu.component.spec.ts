import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LichsuComponent } from './lichsu.component';

describe('LichsuComponent', () => {
  let component: LichsuComponent;
  let fixture: ComponentFixture<LichsuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LichsuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LichsuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
