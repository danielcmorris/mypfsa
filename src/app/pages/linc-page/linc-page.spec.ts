import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LincPage } from './linc-page';

describe('LincPage', () => {
  let component: LincPage;
  let fixture: ComponentFixture<LincPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LincPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LincPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
