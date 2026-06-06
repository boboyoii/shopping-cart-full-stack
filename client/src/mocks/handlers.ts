import { http, HttpResponse } from 'msw';
import type { Product } from '../apis/cart';

const products: Product[] = [
  {
    id: 1,
    name: '운동화',
    thumbnail: 'https://placehold.co/211x211?text=Sneakers',
    price: 35000,
  },
  {
    id: 2,
    name: '양말',
    thumbnail: 'https://placehold.co/211x211?text=Socks',
    price: 25000,
  },
  {
    id: 3,
    name: '양말',
    thumbnail: 'https://placehold.co/211x211?text=Socks',
    price: 25000,
  },
];

let cartItems = [
  {
    productId: 1,
    quantity: 2,
  },
  {
    productId: 2,
    quantity: 2,
  },
  {
    productId: 3,
    quantity: 98,
  },
];

const getProduct = (productId: number) =>
  products.find((product) => product.id === productId);

const getCartItems = () =>
  cartItems.flatMap(({ productId, quantity }) => {
    const product = getProduct(productId);

    return product ? [{ product, quantity }] : [];
  });

export const handlers = [
  http.get('/api/cart/', () => {
    return HttpResponse.json({
      items: getCartItems(),
    });
  }),

  http.delete('/api/cart/items/:productId/', ({ params }) => {
    const productId = Number(params.productId);

    cartItems = cartItems.filter((item) => item.productId !== productId);

    return new HttpResponse(null, {
      status: 204,
    });
  }),

  http.patch('/api/cart/items/:productId/', async ({ params, request }) => {
    const productId = Number(params.productId);
    const { quantity } = (await request.json()) as { quantity?: number };
    const cartItem = cartItems.find((item) => item.productId === productId);

    if (quantity === undefined || quantity < 1 || quantity > 99) {
      return HttpResponse.json(
        {
          errors: {
            quantity: ['수량은 1 이상 99 이하여야 합니다.'],
          },
        },
        { status: 400 },
      );
    }

    if (!cartItem) {
      return HttpResponse.json(
        {
          code: 'RESOURCE_NOT_FOUND',
          message: '요청한 리소스를 찾을 수 없습니다.',
        },
        { status: 404 },
      );
    }

    cartItem.quantity = quantity;

    return HttpResponse.json({
      product_id: productId,
      quantity: cartItem.quantity,
    });
  }),
];
