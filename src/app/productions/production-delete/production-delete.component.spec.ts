import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionDeleteComponent } from './production-delete.component';

describe('ProductionDeleteComponent', () => {
  let component: ProductionDeleteComponent;
  let fixture: ComponentFixture<ProductionDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductionDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductionDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
