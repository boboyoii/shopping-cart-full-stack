import OrderSheet from '../models/OrderSheet.js';

describe('OrderSheet Tests', () => {
  test('주문서 클래스를 객체 형태로 반환한다.', () => {
    const orderSheet = new OrderSheet('user-1', [
      { productId: 'product-1', quantity: 2 },
      { productId: 'product-2', quantity: 1 },
    ]);

    expect(orderSheet.toObject()).toEqual(
      expect.objectContaining({
        userId: 'user-1',
        items: [
          { productId: 'product-1', quantity: 2 },
          { productId: 'product-2', quantity: 1 },
        ],
        selectedCoupons: [],
        isRemoteShippingArea: false,
      }),
    );
  });
});
