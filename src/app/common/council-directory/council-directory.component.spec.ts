import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CouncilDirectoryComponent } from './council-directory.component';

describe('CouncilDirectoryComponent', () => {
  let component: CouncilDirectoryComponent;
  let fixture: ComponentFixture<CouncilDirectoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CouncilDirectoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CouncilDirectoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
