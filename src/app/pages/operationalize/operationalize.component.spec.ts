import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationalizeComponent } from './operationalize.component';

describe('OperationalizeComponent', () => {
  let component: OperationalizeComponent;
  let fixture: ComponentFixture<OperationalizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperationalizeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationalizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
