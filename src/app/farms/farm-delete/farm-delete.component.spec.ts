import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmDeleteComponent } from './farm-delete.component';

describe('FarmDeleteComponent', () => {
  let component: FarmDeleteComponent;
  let fixture: ComponentFixture<FarmDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FarmDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FarmDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
