import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MicroserviceFormComponent } from './microservice-form.component';

describe('MicroserviceFormComponent', () => {
  let component: MicroserviceFormComponent;
  let fixture: ComponentFixture<MicroserviceFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MicroserviceFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MicroserviceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
