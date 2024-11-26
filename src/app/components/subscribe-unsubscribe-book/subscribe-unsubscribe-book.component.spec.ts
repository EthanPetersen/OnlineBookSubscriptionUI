import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscribeUnsubscribeBookComponent } from './subscribe-unsubscribe-book.component';

describe('SubscribeUnsubscribeBookComponent', () => {
  let component: SubscribeUnsubscribeBookComponent;
  let fixture: ComponentFixture<SubscribeUnsubscribeBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubscribeUnsubscribeBookComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubscribeUnsubscribeBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
