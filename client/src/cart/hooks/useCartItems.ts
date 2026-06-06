import { useEffect, useState } from 'react';
import {
  deleteCartItems,
  getCartItems,
  patchCartItemQuantity,
  type CartItemResponse,
} from '../apis/cart';

export const useCartItems = () => {
  const [cartItems, setCartItems] = useState<CartItemResponse[]>([]);

  useEffect(() => {
    getCartItems().then((items) => setCartItems(items));
  }, []);

  const removeCartItem = async (productId: number) => {
    await deleteCartItems(productId);
    setCartItems((prev) =>
      prev.filter(({ product }) => product.id !== productId),
    );
  };

  const updateCartItemQuantity = async (
    productId: number,
    quantity: number,
  ) => {
    const updated = await patchCartItemQuantity(productId, quantity);
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === updated.productId
          ? { ...item, quantity: updated.quantity }
          : item,
      ),
    );
  };

  return { cartItems, removeCartItem, updateCartItemQuantity };
};
