import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SanphamusComponent } from './sanphamus.component';

describe('SanphamusComponent', () => {
  let component: SanphamusComponent;
  let fixture: ComponentFixture<SanphamusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SanphamusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SanphamusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
