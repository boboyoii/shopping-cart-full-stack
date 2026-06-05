export interface Product {
  id: number;
  name: string;
  thumbnail: string;
  price: number;
}

export interface CartItemResponse {
  product: Product;
  quantity: number;
}

export const getCartItems = async (): Promise<CartItemResponse[]> => {
  const response = await fetch('/api/cart/');

  if (!response.ok) {
    throw new Error('장바구니 상품 목록을 불러오지 못했습니다.');
  }

  const data = await response.json();

  return data.items;
};

export const deleteCartItems = async (productId: number): Promise<void> => {
  const response = await fetch(`/api/cart/items/${productId}/`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('장바구니 상품을 제거하지 못했습니다.');
  }
};
