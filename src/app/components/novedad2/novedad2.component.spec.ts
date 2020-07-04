import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Novedad2Component } from './novedad2.component';

describe('Novedad2Component', () => {
  let component: Novedad2Component;
  let fixture: ComponentFixture<Novedad2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Novedad2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Novedad2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
