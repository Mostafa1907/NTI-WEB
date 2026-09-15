import { TestBed } from '@angular/core/testing';
import { OrderService } from './order-service';
import { describe,beforeEach,it,expect } from 'vitest';

describe('Order', () => {
  let service: OrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
