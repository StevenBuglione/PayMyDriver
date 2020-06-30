import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDeliverysComponent } from './create-deliverys.component';

describe('CreateDeliverysComponent', () => {
  let component: CreateDeliverysComponent;
  let fixture: ComponentFixture<CreateDeliverysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateDeliverysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDeliverysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
