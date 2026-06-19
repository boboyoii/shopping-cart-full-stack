import OrderSheet from '../models/OrderSheet.js';
import FixedAmountCoupon from '../models/coupons/FixedAmountCoupon.js';
import { CouponContext } from '../models/coupons/Coupon.js';

const orderSheet = new OrderSheet('user-1', [
  {
    product: {
      id: 'product-1',
      name: '피자',
      price: 30000,
      thumbnail: 'pizza.png',
    },
    quantity: 2,
  },
]);

const createCouponContext = (
  overrides: Partial<CouponContext> = {},
): CouponContext => ({
  orderSheet,
  orderAmount: 60000,
  shippingFee: 3000,
  now: new Date('2026-06-19T00:00:00.000Z'),
  ...overrides,
});

describe('FixedAmountCoupon tests', () => {
  test('최소 주문 금액을 만족하면 쿠폰을 사용할 수 있다.', () => {
    const coupon = new FixedAmountCoupon({
      code: 'FIXED5000',
      name: '5,000원 할인 쿠폰',
      amount: 5000,
      expiresAt: new Date('2026-12-31'),
      conditions: {
        minimumOrderAmount: 50000,
      },
    });

    expect(coupon.canApply(createCouponContext())).toBe(true);
  });

  test('최소 주문 금액을 만족하지 않으면 쿠폰을 사용할 수 없다.', () => {
    const coupon = new FixedAmountCoupon({
      code: 'FIXED5000',
      name: '5,000원 할인 쿠폰',
      amount: 5000,
      expiresAt: new Date('2026-12-31'),
      conditions: {
        minimumOrderAmount: 100000,
      },
    });

    expect(coupon.canApply(createCouponContext())).toBe(false);
  });

  test('만료된 쿠폰은 사용할 수 없다.', () => {
    const coupon = new FixedAmountCoupon({
      code: 'FIXED5000',
      name: '5,000원 할인 쿠폰',
      amount: 5000,
      expiresAt: new Date('2026-01-01'),
    });

    expect(coupon.canApply(createCouponContext())).toBe(false);
  });

  test('사용 가능한 경우 설정한 금액만큼 할인한다.', () => {
    const coupon = new FixedAmountCoupon({
      code: 'FIXED5000',
      name: '5,000원 할인 쿠폰',
      amount: 5000,
      expiresAt: new Date('2026-12-31'),
    });

    expect(coupon.calculateDiscount(createCouponContext())).toBe(5000);
  });
});
