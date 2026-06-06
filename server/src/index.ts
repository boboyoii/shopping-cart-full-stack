import InMemoryStorage from './storages/InMemoryStorage.js';
import { createApp } from './app.js';
import { MY_CART_ID } from './constanst.js';
import { createCartController } from './controllers/cartController.js';
import { createProductController } from './controllers/productController.js';
import Cart from './models/Cart.js';
import Product from './models/Product.js';

const PORT = process.env.PORT ?? 3000;

const storage = new InMemoryStorage();
const cart = storage.getItemById('cart', MY_CART_ID) as Cart;

// 동작 확인을 위한 초기 데이터 추가
const products = [
  new Product(
    '운동화',
    100_000_000_000,
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop',
  ),
  new Product(
    '노트북',
    1,
    'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=200&h=200&fit=crop',
  ),
  new Product(
    '헤드폰',
    2_000,
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop',
  ),
  new Product(
    '시계',
    20_000_000,
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop',
  ),
  new Product(
    '향수',
    2,
    'https://images.unsplash.com/photo-1495707902641-75cac588d2e9?w=200&h=200&fit=crop',
  ),
];

products.forEach((product) => {
  const productId = product.getId();

  storage.addItemById('products', productId, product);
  cart.updateItemByProductId(productId, 1);
});

const productController = createProductController(storage);
const cartController = createCartController(storage);
const app = createApp({ productController, cartController });

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
