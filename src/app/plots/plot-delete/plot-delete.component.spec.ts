import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlotDeleteComponent } from './plot-delete.component';

describe('PlotDeleteComponent', () => {
  let component: PlotDeleteComponent;
  let fixture: ComponentFixture<PlotDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlotDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlotDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
