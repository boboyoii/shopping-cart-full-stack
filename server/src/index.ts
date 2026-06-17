import InMemoryStorage from './storages/InMemoryStorage.js';
import { createApp } from './app.js';
import { USER_ID } from './constanst.js';
import { createCartController } from './controllers/cartController.js';
import { createProductController } from './controllers/productController.js';
import Cart from './models/Cart.js';
import Product from './models/Product.js';
import { createOrderSheetController } from './controllers/orderSheetController.js';

const PORT = process.env.PORT ?? 3000;

const storage = new InMemoryStorage();
const cart = storage.getItemById('cart', USER_ID) as Cart;

// 동작 확인을 위한 초기 데이터 추가
const initialCartItems = [
  {
    product: new Product(
      '운동화',
      129_000,
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop',
    ),
    quantity: 1,
  },
  {
    product: new Product(
      '노트북',
      1_590_000,
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=200&h=200&fit=crop',
    ),
    quantity: 99,
  },
  {
    product: new Product(
      '헤드폰',
      189_000,
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop',
    ),
    quantity: 2,
  },
  {
    product: new Product(
      '시계',
      249_000,
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop',
    ),
    quantity: 3,
  },
  {
    product: new Product(
      '향수',
      89_000,
      'https://images.unsplash.com/photo-1495707902641-75cac588d2e9?w=200&h=200&fit=crop',
    ),
    quantity: 5,
  },
];

initialCartItems.forEach(({ product, quantity }) => {
  const productId = product.getId();

  storage.addItemById('products', productId, product);
  cart.updateItemByProductId(productId, quantity);
});

const productController = createProductController(storage);
const cartController = createCartController(storage);
const orderSheetController = createOrderSheetController(storage);
const app = createApp({
  productController,
  cartController,
  orderSheetController,
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
