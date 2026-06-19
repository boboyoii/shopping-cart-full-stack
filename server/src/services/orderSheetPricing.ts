import { DEFAULT_SHIPPING_FEE, FREE_SHIPPING_THRESHOLD } from '../constanst.js';
import OrderSheet from '../models/OrderSheet.js';
import { CouponContext } from '../models/coupons/Coupon.js';

export interface OrderSheetPricingSummary {
  orderAmount: number;
  shippingFee: number;
  discountAmount: number;
  totalPaymentAmount: number;
}

export function createPricingContext(orderSheet: OrderSheet): CouponContext {
  const orderAmount = calculateOrderAmount(orderSheet);
  const shippingFee = calculateShippingFee(orderAmount);

  return {
    orderSheet,
    orderAmount,
    shippingFee,
    now: new Date(),
  };
}

export function calculateOrderAmount(orderSheet: OrderSheet) {
  return orderSheet
    .toObject()
    .items.reduce(
      (total, { product, quantity }) => total + product.price * quantity,
      0,
    );
}

export function calculateShippingFee(orderAmount: number) {
  return orderAmount >= FREE_SHIPPING_THRESHOLD ? 0 : DEFAULT_SHIPPING_FEE;
}

export function createPricingSummary(
  context: CouponContext,
  discountAmount: number,
): OrderSheetPricingSummary {
  return {
    orderAmount: context.orderAmount,
    shippingFee: context.shippingFee,
    discountAmount,
    totalPaymentAmount:
      context.orderAmount + context.shippingFee - discountAmount,
  };
}
