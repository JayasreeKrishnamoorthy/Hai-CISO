import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubdomaincveComponent } from './subdomaincve.component';

describe('SubdomaincveComponent', () => {
  let component: SubdomaincveComponent;
  let fixture: ComponentFixture<SubdomaincveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubdomaincveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubdomaincveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
