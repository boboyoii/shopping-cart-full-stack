import { http, HttpResponse } from 'msw';
import type { Product } from '../../apis/cart';
import { getCartItem, getProduct } from '../data/cartData';

interface OrderSheetRequestItem {
  productId: string;
  quantity: number;
}

interface CreateOrderSheetRequest {
  items: OrderSheetRequestItem[];
}

interface OrderSheetItem {
  product: Product;
  quantity: number;
}

interface OrderSheet {
  id: string;
  items: OrderSheetItem[];
  selectedCouponIds: string[];
  isRemoteShippingArea: boolean;
}

const orderSheets = new Map<string, OrderSheet>();

const getPricing = (orderSheet: OrderSheet) => {
  const orderAmount = orderSheet.items.reduce(
    (total, { product, quantity }) => total + product.price * quantity,
    0,
  );
  const shippingFee = orderAmount >= 100_000 ? 0 : 3_000;

  return {
    orderAmount,
    shippingFee,
    discountAmount: 0,
    totalPaymentAmount: orderAmount + shippingFee,
  };
};

export const orderSheetHandlers = [
  http.post('/api/order-sheets/', async ({ request }) => {
    const { items } = (await request.json()) as CreateOrderSheetRequest;
    const hasInvalidOrderItem = items.some(
      ({ productId }) => !getProduct(productId) || !getCartItem(productId),
    );

    if (hasInvalidOrderItem) {
      return HttpResponse.json(
        {
          code: 'RESOURCE_NOT_FOUND',
          message: '요청한 리소스를 찾을 수 없습니다.',
        },
        { status: 404 },
      );
    }

    const orderItems = items.map(({ productId, quantity }) => ({
      product: getProduct(productId) as Product,
      quantity,
    }));
    const id = crypto.randomUUID();
    orderSheets.set(id, {
      id,
      items: orderItems,
      selectedCouponIds: [],
      isRemoteShippingArea: false,
    });

    return HttpResponse.json({ id }, { status: 201 });
  }),

  http.get('/api/order-sheets/:orderSheetId/pricing/', ({ params }) => {
    const orderSheetId = params.orderSheetId as string;
    const orderSheet = orderSheets.get(orderSheetId);

    if (!orderSheet) {
      return HttpResponse.json(
        {
          code: 'RESOURCE_NOT_FOUND',
          message: '요청한 리소스를 찾을 수 없습니다.',
        },
        { status: 404 },
      );
    }

    return HttpResponse.json({ pricing: getPricing(orderSheet) });
  }),

  http.get('/api/order-sheets/:orderSheetId/', ({ params }) => {
    const orderSheetId = params.orderSheetId as string;
    const orderSheet = orderSheets.get(orderSheetId);

    if (!orderSheet) {
      return HttpResponse.json(
        {
          code: 'RESOURCE_NOT_FOUND',
          message: '요청한 리소스를 찾을 수 없습니다.',
        },
        { status: 404 },
      );
    }

    return HttpResponse.json({ orderSheet });
  }),
];
