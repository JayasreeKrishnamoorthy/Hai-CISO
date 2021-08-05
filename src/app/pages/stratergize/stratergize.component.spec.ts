import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StratergizeComponent } from './stratergize.component';

describe('StratergizeComponent', () => {
  let component: StratergizeComponent;
  let fixture: ComponentFixture<StratergizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StratergizeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StratergizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
