import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockUIintegratedComponent } from './block-uiintegrated.component';

describe('BlockUIintegratedComponent', () => {
  let component: BlockUIintegratedComponent;
  let fixture: ComponentFixture<BlockUIintegratedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlockUIintegratedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockUIintegratedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
