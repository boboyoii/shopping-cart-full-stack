import { useState } from 'react';
import type { CartItemResponse } from '../apis/cart';

export const useCartSelection = (cartItems: CartItemResponse[]) => {
  const [selectedProductIds, setSelectedProductIds] = useState<number[]>(() =>
    cartItems.map((item) => item.product.id),
  );

  const isAllSelected =
    cartItems.length > 0 && selectedProductIds.length === cartItems.length;

  const toggleItem = (productId: number) => {
    setSelectedProductIds((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId],
    );
  };

  const toggleAll = () => {
    setSelectedProductIds(
      isAllSelected ? [] : cartItems.map((i) => i.product.id),
    );
  };

  const deselectItem = (productId: number) => {
    setSelectedProductIds((prev) => prev.filter((id) => id !== productId));
  };

  return {
    selectedProductIds,
    isAllSelected,
    toggleItem,
    toggleAll,
    deselectItem,
  };
};
